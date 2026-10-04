# PakChat frontend

The frontend is a React single-page application. It provides the authentication, contacts, profile, and real-time chat interfaces and communicates with the Express API over HTTP and Socket.IO.

## Requirements

- Node.js and npm
- A running PakChat backend (see [backend/README.md](../backend/README.md))

## Local development

From this directory:

```bash
cp ".env copy" .env
npm install
npm start
```

On Windows PowerShell, use `Copy-Item ".env copy" .env` for the first command. The development server runs at [http://localhost:3000](http://localhost:3000).

Set these values in `.env`:

| Variable | Purpose | Local value |
|---|---|---|
| `REACT_APP_NODE` | Runtime mode used by the client | `local` |
| `REACT_APP_API_ORIGIN` | Backend API base URL; Socket.IO uses this host too | `http://localhost:8000/api` |

Provider integrations are optional. Set their client IDs or site key when enabling them: `REACT_APP_GOOGLE_AUTH_CLIENT_ID`, `REACT_APP_GITHUB_AUTH_CLIENT_ID`, `REACT_APP_LINKEDIN_AUTH_CLIENT_ID`, and `REACT_APP_RECAPTCHA_CLIENT`. `REACT_APP_GA_ID` configures Google Analytics.

Create React App embeds `REACT_APP_*` values into the client build. Do not put private keys, database credentials, or other secrets in frontend environment variables.

## Scripts

```bash
npm start       # Start the local development server
npm run build   # Create a production build in build/
npm test        # Run the Create React App test runner
```

## Deploy to Netlify

For this repository's layout, connect the GitHub repository to Netlify and configure:

- **Base directory:** `frontend`
- **Build command:** `npm run build`
- **Publish directory:** `build`

Add the following environment variables in Netlify and redeploy:

| Variable | Value |
|---|---|
| `REACT_APP_API_ORIGIN` | `https://<your-render-service>.onrender.com/api` |
| `REACT_APP_NODE` | `production` |

Add OAuth, reCAPTCHA, and analytics client values if those integrations are enabled. Configure OAuth providers with the deployed frontend callback URL. The `public/_redirects` file sends client-side routes back to `index.html`, which is needed for direct links such as `/auth/reset-password`.

The backend must allow the deployed frontend origin through its `FRONT_URL` CORS setting. See the root [README](../Readme.md) for the full deployment sequence.
