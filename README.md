# RedBus-Plus-Pro

RedBus-Plus-Pro is an enterprise-grade, responsive travel management ecosystem built using the MEAN Stack. Unlike traditional booking platforms, it leverages Angular's Component-Driven Architecture and RxJS to deliver a high-performance Single-Page Application (SPA) experience focused on community intelligence and user accessibility.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher) and npm
- A running MongoDB instance (local or remote)

## Quick Setup

### Step 1 – Install dependencies

Run the following from the repository root:

```bash
npm run setup
```

This installs dependencies for both the frontend and backend.

### Step 2 – Start the backend server

```bash
npm run start:backend
```

The backend API will be available at **http://localhost:5000**.

### Step 3 – Start the frontend dev server

In a new terminal:

```bash
npm run start:frontend
```

The Angular app will be available at **http://localhost:4200**.

---

## Manual Setup

If you prefer to set up each part individually, follow these steps.

### Backend

```bash
cd REDBUS-CLONE-MEAN-main/REDBUS-CLONE-MEAN-main/frontend/server
npm install
npm start
```

### Frontend

```bash
cd REDBUS-CLONE-MEAN-main/REDBUS-CLONE-MEAN-main/frontend
npm install
npm start
```

---

## Project Structure

```
RedBus-Plus-Pro/
└── REDBUS-CLONE-MEAN-main/
    └── REDBUS-CLONE-MEAN-main/
        └── frontend/           <- Angular 17 app
            ├── src/            <- Angular source files
            ├── angular.json    <- Angular CLI configuration
            ├── package.json
            └── server/         <- Express / Node.js backend
                ├── controller/
                ├── models/
                ├── routes/
                ├── index.js    <- Entry point (port 5000)
                └── package.json
```

## Technologies

- **Frontend:** Angular 17, Angular Material, RxJS, TailwindCSS
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB

---

## Deploying to Vercel

This project is configured for deployment on [Vercel](https://vercel.com), which provides the best experience for full-stack MEAN applications — hosting the Angular SPA as a static site and the Express backend as serverless functions.

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RoushniSinha/RedBus-Plus-Pro)

### Manual deploy steps

1. **Install the Vercel CLI** (optional, for CLI-based deploy):
   ```bash
   npm install -g vercel
   ```

2. **Set the `MONGODB_URI` environment variable** in Vercel:
   - Go to your Vercel project → **Settings → Environment Variables**
   - Add `MONGODB_URI` with your MongoDB Atlas connection string

3. **Deploy from the Vercel dashboard:**
   - Connect your GitHub repository to Vercel
   - Vercel auto-detects `vercel.json` and uses the configured build command
   - The Angular frontend and Express API are deployed automatically

### How it works

| Layer    | Technology | Vercel behavior |
|----------|-----------|-----------------|
| Frontend | Angular 17 SPA | Built with `ng build --configuration production` and served as static files |
| API      | Express / Node.js | Exposed via `api/server.js` as a Vercel Serverless Function |
| Database | MongoDB Atlas | Connected via `MONGODB_URI` environment variable |

API routes (`/customer/*`, `/routes/*`, `/booking/*`) are proxied to the serverless function.  
All other paths fall back to `index.html` so Angular's client-side router works correctly.

### Environment variable reference

| Variable | Description | Default (dev only) |
|---|---|---|
| `MONGODB_URI` | MongoDB connection string | Hardcoded Atlas URL in `server/index.js` and `api/server.js` |
