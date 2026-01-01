Deploying the backend on Render

Quick summary

- Service root: `backend`
- Start command: `npm start`
- Required env vars on Render: `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`

Option A — Use `render.yaml` (recommended for reproducible deploys)

1. Edit `render.yaml` in repository root to set `name`, `branch`, and `region` as desired.
2. Push the repository to GitHub (or any connected Git provider).
3. In Render dashboard, create a new "Web Service" and either link the repo (Render will detect `render.yaml`) or import the `render.yaml` manifest.
4. For the database entry in `render.yaml`, create the DB in Render dashboard or let the manifest create it; then set the service's `DATABASE_URL` from the created database's connection string.
5. Add `JWT_SECRET` in the Environment > Environment Variables for the service (use a strong random secret).
6. Deploy and watch build logs.

Option B — Manual setup (GUI)

1. Push repo to GitHub.
2. In Render, click "New +" → "Web Service" → Connect your repo → pick the backend folder as the root.
3. Set Build Command: `npm install` and Start Command: `npm start`.
4. In Render dashboard create a new Postgres database (Managed Databases → New Database). Copy the provided DATABASE_URL and add it to the Web Service's Environment > Environment Variables as `DATABASE_URL`.
5. Add `JWT_SECRET` (secure random string) and `NODE_ENV=production` to the Web Service env vars.
6. Deploy.

Local test before deploy (optional)

1. From `backend` folder install deps and start with local env vars:

```powershell
cd backend
npm install
$env:DATABASE_URL = "postgres://user:pass@host:port/dbname"
$env:JWT_SECRET = "a_strong_secret"
npm start
```

Notes & troubleshooting

- `DATABASE_URL` must point to a Postgres instance. If you don't have one locally, use Render's managed Postgres after creating it and copy the connection string.
- Logs: check Render service logs for build/runtime errors.
- If migrations or seeding are needed, add scripts in `package.json` and run them via `Build Command` or `Post Deploy` hooks in Render.

If you want, I can:

- Draft a `Procfile` or adjust `render.yaml` for multiple services (frontend + backend).
- Create and commit a `.github/workflows/render-deploy.yml` to auto-deploy on push (you must provide access tokens).
