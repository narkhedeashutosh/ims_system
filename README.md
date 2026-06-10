# iMS — Asset Management System

Static AngularJS 1.8 app. No build step required.

## Run locally

```bash
cd AssetInventorySystem
python3 -m http.server 5500
```

Open **http://localhost:5500** — login with `admin` / `admin`.

## Deploy to Vercel

This project is **not** an Angular CLI app. Do not use `ng build`.

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Set **Framework Preset** to **Other** (not Angular).
4. Leave **Build Command** empty.
5. Set **Output Directory** to `.` (project root).
6. Deploy.

Or deploy from the CLI:

```bash
vercel
```

`vercel.json` in the repo configures static hosting automatically.
