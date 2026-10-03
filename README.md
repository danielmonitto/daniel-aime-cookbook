# Daniel & Aime's Cookbook

A mobile-first cookbook PWA with shared server-side storage. The frontend is plain HTML, CSS, and JavaScript; a small Flask API stores recipes in SQLite and photos on disk.

## What is included

- swipeable virtual cookbook pages
- add, edit, and delete recipes shared by every device
- server-hosted recipe photos
- effort and deliciousness scores
- ingredients, method, tags, filtering, and search
- recipe backup export/import
- one-time migration from the old browser `localStorage`
- installable PWA shell

## Storage layout

Production data lives outside the application directory so deployments do not overwrite it:

```text
/opt/cookbook-data/
├── cookbook.db
└── uploads/
    └── <generated image names>
```

Set `COOKBOOK_DATA_DIR` to use a different location. The server creates the database, upload directory, schema, and starter recipes on first run.

## Run locally

Python 3.10 or newer is recommended.

```bash
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
COOKBOOK_DATA_DIR="$PWD/.local-data" flask --app server run --port 8080
```

Open `http://localhost:8080`. Do not use `python -m http.server`; the frontend now requires the API.

Run the API tests with:

```bash
python -m unittest discover -s tests
```

## API

```text
GET    /api/recipes
POST   /api/recipes
PUT    /api/recipes/<id>
DELETE /api/recipes/<id>
PUT    /api/recipes          # replace all recipes during backup import
POST   /api/uploads          # multipart field: image
GET    /uploads/<filename>
```

Uploads accept JPEG, PNG, WebP, and GIF images up to 10 MB. The browser resizes newly selected photos before upload.

## Deploy on the websites LXC

Copy this repository to `/opt/cookbook`, then run as root:

```bash
cd /opt/cookbook
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
mkdir -p /opt/cookbook-data/uploads
chown -R www-data:www-data /opt/cookbook-data
cp deploy/cookbook.service /etc/systemd/system/cookbook.service
cp deploy/nginx.conf /etc/nginx/sites-available/cookbook
ln -s /etc/nginx/sites-available/cookbook /etc/nginx/sites-enabled/cookbook
systemctl daemon-reload
systemctl enable --now cookbook
nginx -t
systemctl reload nginx
```

The included Nginx file listens on HTTP so it can sit behind an existing HTTPS reverse proxy or certificate setup. If TLS terminates directly on this LXC, keep the existing certificate directives when replacing the site configuration.

The app does not include account authentication. Keep any existing access control in front of `cookbook.monitto.net`, or add Nginx Basic Auth, because the API permits writes and backup imports.

Useful checks:

```bash
systemctl status cookbook
journalctl -u cookbook -n 100 --no-pager
curl http://127.0.0.1:8080/api/recipes
```

## Move recipes from the old version

After deployment, a device that still has recipes in browser `localStorage` will show **Move recipes from this device** in the menu. Use this once on the phone with the copy you want to keep. It merges those recipes into the shared database and uploads embedded photos.

Do not run the migration from another device if its old copy is stale: recipes with matching IDs are updated. The old local data is retained in the browser as a safety copy, but the new app no longer reads it after migration.

JSON backups made by the old version can also be imported. Import replaces the shared cookbook for everyone, while export downloads the current shared cookbook.

## Backups

Back up both `cookbook.db` and `uploads/`. For a consistent SQLite file copy, stop the service briefly or use SQLite's `.backup` command:

```bash
sqlite3 /opt/cookbook-data/cookbook.db ".backup '/opt/cookbook-data/cookbook-backup.db'"
```

## Main files

- `server.py` — Flask API, SQLite schema, uploads, and static file serving
- `starter-recipes.json` — recipes inserted only on first database creation
- `index.html` — app layout and forms
- `styles.css` — mobile UI and book appearance
- `app.js` — UI logic and API calls
- `sw.js` — offline cache for the app shell (API responses are never cached)
- `deploy/` — example systemd and Nginx configuration
