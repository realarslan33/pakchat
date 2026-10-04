# PakChat backend

The backend is an Express API and Socket.IO server. It handles authentication, user and friend operations, conversations, messages, database access, and integrations such as email and image uploads.

## Requirements

- Node.js and npm
- MongoDB, local or hosted (MongoDB Atlas, for example)

## Local development

From this directory:

```bash
cp ".env copy" .env
npm install
npm start
```

On Windows PowerShell, use `Copy-Item ".env copy" .env` to create the environment file. `npm start` runs `nodemon server.js`; the supplied environment template sets the local server port to `8000`. The API is available at `http://localhost:8000/api`.

Configure `backend/.env` before starting the server:

| Variable | Required | Purpose |
|---|---|---|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_ACCESS_SECRET` | Yes | Secret used to sign access tokens |
| `JWT_REFRESH_SECRET` | Yes | Secret used to sign refresh tokens |
| `FRONT_URL` | Yes | Exact frontend origin allowed by CORS; local default is `http://localhost:3000` |
| `PORT` | No | HTTP and Socket.IO port; defaults to `5000` when omitted |
| `MAIL_USER`, `MAIL_PASS` | For email | Gmail account and app password used by Nodemailer |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | For uploads | Cloudinary credentials |
| `GOOGLE_RECAPTCHA_SECRET` | For reCAPTCHA | Server-side reCAPTCHA secret |

The frontend also requires its own provider client IDs/site key. Store secrets only in `.env` locally or in the hosting provider's environment settings. Never commit real credentials.

## Production start

Install dependencies and run the server with Node directly:

```bash
npm install
node server.js
```

The server reads the `PORT` supplied by the hosting platform and starts both the HTTP API and Socket.IO on that port.

## Deploy to Render

Create a Render **Web Service** from the GitHub repository and set:

- **Root directory:** `backend`
- **Build command:** `npm install`
- **Start command:** `node server.js`

Add `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, and `FRONT_URL` in Render's environment settings. `FRONT_URL` must be the frontend's exact deployed origin (for example, `https://your-site.netlify.app`, with no trailing slash). Add mail, Cloudinary, OAuth, or reCAPTCHA credentials only for integrations you use. Render supplies `PORT` at runtime.

Allow the Render service to connect to your MongoDB deployment by configuring its database user and network access rules. After deployment, set the frontend's `REACT_APP_API_ORIGIN` to `https://<your-render-service>.onrender.com/api` and redeploy the frontend. Socket.IO connects to the same host.

Render supports WebSockets. Free services may sleep while idle, so the first request after inactivity can take longer. See the root [README](../Readme.md) for the complete deployment steps.
