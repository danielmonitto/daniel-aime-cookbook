# Daniel & Aime's Cookbook

A mobile-first virtual cookbook PWA built with plain HTML, CSS and JavaScript. No framework or build step is required.

## What is included

- swipeable virtual cookbook pages
- recipe photos
- effort score out of 10
- deliciousness score out of 10
- ingredients and step-by-step method
- recipe tags and filtering
- search across names, notes and ingredients
- add, edit and delete recipes
- local device storage
- image resizing before saving
- recipe backup export/import
- installable PWA
- offline service worker
- responsive mobile-first UI

## Run locally

Do not open `index.html` directly if you want the PWA/service worker features. Serve the folder locally instead.

With Python:

```bash
cd daniel-aime-cookbook
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Hosting

This is a static site, so you can host it on GitHub Pages, Cloudflare Pages, Netlify, Vercel, Railway static hosting, or your own Nginx server.

For PWA installation, host it over HTTPS. `localhost` also works for development.

## Where recipes are stored

Right now recipes are stored in the browser's `localStorage`. That makes the project easy to run and means no database is required.

Because photos are stored with the recipe data, the app automatically shrinks uploaded images first. Browser storage is still limited, so use the Export Cookbook option occasionally.

## Recommended next upgrade

When you are ready to make Daniel's phone and Aime's phone automatically share the same recipes, replace `localStorage` with a small backend/database. Supabase is a simple option because you can keep this frontend and add:

- shared login
- Postgres recipe table
- image storage bucket
- realtime syncing between both phones

The UI code is already separated enough that the storage functions in `app.js` can be replaced later without redesigning the frontend.

## Main files

- `index.html` — app layout and forms
- `styles.css` — full mobile UI, book appearance and animations
- `app.js` — recipe logic, search, storage, PWA interactions
- `manifest.json` — installable app metadata
- `sw.js` — offline cache
- `icons/` — PWA icons
