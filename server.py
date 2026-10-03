import json
import os
import re
import sqlite3
import uuid
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path

from flask import Flask, abort, jsonify, request, send_from_directory
from werkzeug.exceptions import RequestEntityTooLarge


APP_DIR = Path(__file__).resolve().parent
DEFAULT_DATA_DIR = Path("/opt/cookbook-data")
ALLOWED_IMAGE_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
}
MAX_IMAGE_BYTES = 10 * 1024 * 1024
RECIPE_FIELDS = (
    "id", "title", "image", "prep", "cook", "tag", "effort", "delicious",
    "note", "ingredients", "steps", "createdAt", "updatedAt",
)


def utc_now():
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def create_app(test_config=None):
    app = Flask(__name__, static_folder=None)
    app.config.update(
        DATA_DIR=Path(os.environ.get("COOKBOOK_DATA_DIR", DEFAULT_DATA_DIR)),
        MAX_CONTENT_LENGTH=MAX_IMAGE_BYTES,
    )
    if test_config:
        app.config.update(test_config)

    data_dir = Path(app.config["DATA_DIR"])
    upload_dir = data_dir / "uploads"
    data_dir.mkdir(parents=True, exist_ok=True)
    upload_dir.mkdir(parents=True, exist_ok=True)
    app.config["DATABASE"] = data_dir / "cookbook.db"
    app.config["UPLOAD_DIR"] = upload_dir
    initialise_database(app)

    @app.after_request
    def api_no_store(response):
        if request.path.startswith("/api/"):
            response.headers["Cache-Control"] = "no-store"
        return response

    @app.errorhandler(RequestEntityTooLarge)
    def image_too_large(_error):
        return jsonify(error="Images must be smaller than 10 MB."), 413

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify(error=getattr(error, "description", "Invalid request.")), 400

    @app.errorhandler(404)
    def not_found(_error):
        return jsonify(error="Not found."), 404

    @app.get("/api/recipes")
    def list_recipes():
        with database(app) as connection:
            rows = connection.execute(
                "SELECT * FROM recipes ORDER BY position ASC, created_at DESC"
            ).fetchall()
        return jsonify([row_to_recipe(row) for row in rows])

    @app.post("/api/recipes")
    def create_recipe():
        recipe = normalise_recipe(request.get_json(silent=True), require_id=False)
        with database(app) as connection:
            if connection.execute("SELECT 1 FROM recipes WHERE id = ?", (recipe["id"],)).fetchone():
                return jsonify(error="A recipe with that id already exists."), 409
            recipe["position"] = next_position(connection)
            write_recipe(connection, recipe)
        return jsonify(public_recipe(recipe)), 201

    @app.put("/api/recipes/<recipe_id>")
    def update_recipe(recipe_id):
        recipe = normalise_recipe(request.get_json(silent=True), recipe_id=recipe_id)
        with database(app) as connection:
            existing = connection.execute(
                "SELECT position, created_at FROM recipes WHERE id = ?", (recipe_id,)
            ).fetchone()
            if not existing:
                abort(404)
            recipe["position"] = existing["position"]
            recipe["createdAt"] = recipe.get("createdAt") or existing["created_at"]
            write_recipe(connection, recipe, replace=True)
        return jsonify(public_recipe(recipe))

    @app.delete("/api/recipes/<recipe_id>")
    def delete_recipe(recipe_id):
        with database(app) as connection:
            result = connection.execute("DELETE FROM recipes WHERE id = ?", (recipe_id,))
            if not result.rowcount:
                abort(404)
        return "", 204

    @app.put("/api/recipes")
    def replace_recipes():
        payload = request.get_json(silent=True)
        if not isinstance(payload, list):
            return jsonify(error="Expected a JSON array of recipes."), 400
        cleaned = [normalise_recipe(item, require_id=False) for item in payload]
        if len({recipe["id"] for recipe in cleaned}) != len(cleaned):
            return jsonify(error="Recipe ids must be unique."), 400
        with database(app) as connection:
            connection.execute("DELETE FROM recipes")
            for position, recipe in enumerate(cleaned):
                recipe["position"] = position
                write_recipe(connection, recipe)
        return jsonify([public_recipe(recipe) for recipe in cleaned])

    @app.post("/api/uploads")
    def upload_image():
        image = request.files.get("image")
        if not image or not image.filename:
            return jsonify(error="Choose an image to upload."), 400
        extension = ALLOWED_IMAGE_TYPES.get(image.mimetype)
        if not extension:
            return jsonify(error="Only JPEG, PNG, WebP, and GIF images are supported."), 415
        filename = f"{uuid.uuid4().hex}{extension}"
        image.save(upload_dir / filename)
        return jsonify(url=f"/uploads/{filename}"), 201

    @app.get("/uploads/<path:filename>")
    def uploaded_file(filename):
        response = send_from_directory(upload_dir, filename)
        response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
        return response

    @app.get("/")
    def index():
        return send_from_directory(APP_DIR, "index.html")

    @app.get("/<path:filename>")
    def static_file(filename):
        return send_from_directory(APP_DIR, filename)

    return app


@contextmanager
def database(app):
    connection = sqlite3.connect(app.config["DATABASE"])
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    try:
        with connection:
            yield connection
    finally:
        connection.close()


def initialise_database(app):
    with database(app) as connection:
        connection.execute("PRAGMA journal_mode = WAL")
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS recipes (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                image TEXT NOT NULL DEFAULT '',
                prep TEXT NOT NULL DEFAULT '',
                cook TEXT NOT NULL DEFAULT '',
                tag TEXT NOT NULL DEFAULT 'Recipe',
                effort REAL,
                delicious REAL,
                note TEXT NOT NULL DEFAULT '',
                ingredients TEXT NOT NULL DEFAULT '[]',
                steps TEXT NOT NULL DEFAULT '[]',
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                position INTEGER NOT NULL DEFAULT 0
            )
            """
        )
        connection.execute(
            "CREATE TABLE IF NOT EXISTS app_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)"
        )
        seeded = connection.execute(
            "SELECT value FROM app_meta WHERE key = 'starter_data_created'"
        ).fetchone()
        if not seeded:
            starters = json.loads((APP_DIR / "starter-recipes.json").read_text())
            for position, item in enumerate(starters):
                recipe = normalise_recipe(item, require_id=False)
                recipe["position"] = position
                connection.execute("DELETE FROM recipes WHERE id = ?", (recipe["id"],))
                write_recipe(connection, recipe)
            connection.execute(
                "INSERT INTO app_meta (key, value) VALUES ('starter_data_created', ?)",
                (utc_now(),),
            )


def normalise_recipe(payload, recipe_id=None, require_id=True):
    if not isinstance(payload, dict):
        abort(400, description="Expected a JSON recipe object.")
    title = str(payload.get("title", "")).strip()
    ingredients = payload.get("ingredients", [])
    steps = payload.get("steps", [])
    if not title or not isinstance(ingredients, list) or not isinstance(steps, list):
        abort(400, description="A title, ingredients array, and steps array are required.")

    incoming_id = recipe_id or payload.get("id")
    if require_id and not incoming_id:
        abort(400, description="A recipe id is required.")
    incoming_id = str(incoming_id or uuid.uuid4())
    if not re.fullmatch(r"[A-Za-z0-9_-]{1,200}", incoming_id):
        abort(400, description="Recipe ids may contain only letters, numbers, hyphens, and underscores.")
    image = str(payload.get("image", ""))
    if image and not re.fullmatch(r"/uploads/[0-9a-f]{32}\.(?:jpg|png|webp|gif)", image):
        abort(400, description="Recipe images must be uploaded before saving.")
    now = utc_now()
    return {
        "id": incoming_id,
        "title": title[:80],
        "image": image,
        "prep": str(payload.get("prep", ""))[:20],
        "cook": str(payload.get("cook", ""))[:20],
        "tag": str(payload.get("tag", "Recipe")).strip()[:24] or "Recipe",
        "effort": normalise_score(payload.get("effort")),
        "delicious": normalise_score(payload.get("delicious")),
        "note": str(payload.get("note", ""))[:2000],
        "ingredients": [str(item).strip() for item in ingredients if str(item).strip()],
        "steps": [str(item).strip() for item in steps if str(item).strip()],
        "createdAt": str(payload.get("createdAt") or now),
        "updatedAt": str(payload.get("updatedAt") or now),
    }


def normalise_score(value):
    if value is None or value == "":
        return None
    try:
        score = float(value)
    except (TypeError, ValueError):
        abort(400, description="Scores must be numbers from 1 to 10.")
    if not 1 <= score <= 10:
        abort(400, description="Scores must be numbers from 1 to 10.")
    return score


def next_position(connection):
    return connection.execute("SELECT COALESCE(MIN(position), 0) - 1 FROM recipes").fetchone()[0]


def write_recipe(connection, recipe, replace=False):
    statement = "INSERT OR REPLACE" if replace else "INSERT"
    connection.execute(
        f"""
        {statement} INTO recipes (
            id, title, image, prep, cook, tag, effort, delicious, note,
            ingredients, steps, created_at, updated_at, position
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            recipe["id"], recipe["title"], recipe["image"], recipe["prep"],
            recipe["cook"], recipe["tag"], recipe["effort"], recipe["delicious"],
            recipe["note"], json.dumps(recipe["ingredients"], ensure_ascii=False),
            json.dumps(recipe["steps"], ensure_ascii=False), recipe["createdAt"],
            recipe["updatedAt"], recipe["position"],
        ),
    )


def row_to_recipe(row):
    return {
        "id": row["id"],
        "title": row["title"],
        "image": row["image"],
        "prep": row["prep"],
        "cook": row["cook"],
        "tag": row["tag"],
        "effort": row["effort"],
        "delicious": row["delicious"],
        "note": row["note"],
        "ingredients": json.loads(row["ingredients"]),
        "steps": json.loads(row["steps"]),
        "createdAt": row["created_at"],
        "updatedAt": row["updated_at"],
    }


def public_recipe(recipe):
    return {field: recipe.get(field) for field in RECIPE_FIELDS}


app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "8080")))
