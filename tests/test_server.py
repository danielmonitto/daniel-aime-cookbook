import os
import tempfile
import unittest
from io import BytesIO
from pathlib import Path


IMPORT_DATA_DIR = tempfile.TemporaryDirectory()
os.environ["COOKBOOK_DATA_DIR"] = IMPORT_DATA_DIR.name

from server import create_app  # noqa: E402


class CookbookApiTest(unittest.TestCase):
    def setUp(self):
        self.data_dir = tempfile.TemporaryDirectory()
        self.app = create_app({"TESTING": True, "DATA_DIR": Path(self.data_dir.name)})
        self.client = self.app.test_client()

    def tearDown(self):
        self.data_dir.cleanup()

    def test_crud_flow(self):
        self.assertEqual(len(self.client.get("/api/recipes").get_json()), 6)
        recipe = {
            "id": "test-recipe",
            "title": "Test Recipe",
            "image": "",
            "prep": "5 min",
            "cook": "10 min",
            "tag": "Test",
            "effort": 2,
            "delicious": 9,
            "note": "API test",
            "ingredients": ["one thing"],
            "steps": ["cook it"],
        }

        created = self.client.post("/api/recipes", json=recipe)
        self.assertEqual(created.status_code, 201)
        recipe["title"] = "Updated Recipe"
        updated = self.client.put("/api/recipes/test-recipe", json=recipe)
        self.assertEqual(updated.status_code, 200)
        self.assertEqual(updated.get_json()["title"], "Updated Recipe")
        self.assertEqual(self.client.delete("/api/recipes/test-recipe").status_code, 204)

    def test_upload_flow(self):
        response = self.client.post(
            "/api/uploads",
            data={"image": (BytesIO(b"jpeg test content"), "photo.jpg", "image/jpeg")},
        )
        self.assertEqual(response.status_code, 201)
        uploaded = self.client.get(response.get_json()["url"])
        self.assertEqual(uploaded.status_code, 200)
        uploaded.close()

    def test_empty_import_does_not_reseed(self):
        self.assertEqual(self.client.put("/api/recipes", json=[]).status_code, 200)
        restarted = create_app({"TESTING": True, "DATA_DIR": Path(self.data_dir.name)})
        self.assertEqual(restarted.test_client().get("/api/recipes").get_json(), [])


if __name__ == "__main__":
    unittest.main()
