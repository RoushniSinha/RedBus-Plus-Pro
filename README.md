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
