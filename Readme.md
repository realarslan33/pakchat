# PakChat

PakChat is a real-time messaging application built with React, Node.js, Express, MongoDB, and Socket.IO. It supports one-to-one conversations, friend discovery, account verification, and responsive chat interfaces.

## Features

- Real-time one-to-one messaging, typing indicators, and online status
- Account registration, email verification, login, and password reset
- Contact and friend search, friend requests, and infinite scrolling
- Google, GitHub, and LinkedIn sign-in integrations
- Profile editing and image uploads through Cloudinary
- Responsive layout, dark and light themes, and configurable color themes
- Protected API and Socket.IO connections using JWT authentication

## Stack

| Area | Technologies |
|---|---|
| Frontend | React 18, React Router, Redux Toolkit, Material UI |
| Backend | Node.js, Express, Socket.IO |
| Database | MongoDB with Mongoose |
| Integrations | Nodemailer, Cloudinary, OAuth providers, Google reCAPTCHA |

## Repository layout

```text
backend/   Express API, Socket.IO server, database models, and mail templates
frontend/  React client
```

## Run locally

Use Node.js and npm. Open two terminals from the repository root.

### 1. Configure the backend

```powershell
cd backend
Copy-Item ".env copy" .env
npm install
npm start
```

Edit `backend/.env` and set at least `MONGODB_URI`, `JWT_ACCESS_SECRET`, and `JWT_REFRESH_SECRET`. Set `FRONT_URL` to `http://localhost:3000`. The backend listens on port `8000` by default.

### 2. Configure the frontend

In a second terminal:

```powershell
cd frontend
Copy-Item ".env copy" .env
npm install
npm start
```

The frontend opens at [http://localhost:3000](http://localhost:3000). Its local API URL is configured as `http://localhost:8000/api` in `frontend/.env`.

### Integrations

Email verification and password-reset emails need `MAIL_USER` and `MAIL_PASS`. Profile image uploads need Cloudinary credentials. OAuth and reCAPTCHA integrations need credentials from their respective providers. These values belong in local `.env` files or your hosting provider's secret settings; never commit real credentials.

## Deploy

An approachable hosted setup is **Netlify for the frontend**, **Render for the backend**, and **MongoDB Atlas for the database**. The services can be deployed from this repository independently.

1. Create a MongoDB Atlas database and copy its connection string.
2. Create a Render **Web Service** from this repository. Set the root directory to `backend`, the build command to `npm install`, and the start command to `node server.js`.
3. Add backend environment variables in Render: `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, and `FRONT_URL` (the exact public frontend origin, with no trailing slash). Add mail, Cloudinary, OAuth, or reCAPTCHA credentials when enabling those integrations. Render provides `PORT` for the service.
4. Create a Netlify site from this repository. Set the base directory to `frontend`, the build command to `npm run build`, and the publish directory to `build`.
5. Add these frontend build environment variables in Netlify, then redeploy:

   | Variable | Value |
   |---|---|
   | `REACT_APP_API_ORIGIN` | `https://<your-render-service>.onrender.com/api` |
   | `REACT_APP_NODE` | `production` |

   Add provider client IDs as needed for Google, reCAPTCHA, or Google Analytics.

6. Confirm `FRONT_URL` on Render matches the deployed Netlify origin. Configure the Atlas network access list and database user so the backend can connect. Update OAuth provider callback settings to use the deployed URLs.

Netlify's `frontend/public/_redirects` file supports client-side routes. Render's free web services can spin down when idle, so the first request after inactivity may take longer.

For component-specific details, see [backend/README.md](backend/README.md) and [frontend/README.md](frontend/README.md).


