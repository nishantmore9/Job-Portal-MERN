# Job Portal — Backend

A concise, production-ready Node.js + Express REST API powering the Job Portal application. Designed for speed, maintainability, and clear separation of concerns — ideal to include on a developer resume.

---

## Highlights
- RESTful API built with Express and modern ES modules
- MongoDB via Mongoose for schema-driven data modeling
- JWT-based authentication with cookie support (`JWT_SECRET`)
- File upload handling with `multer` and images served via Cloudinary
- Clean folder structure: controllers, models, router, middlewares, utils

---

## Tech Stack
- Node.js, Express
- MongoDB, Mongoose
- JWT (jsonwebtoken)
- Cloudinary (cloudinary SDK) for image storage
- Multer + DataURI for file buffering and upload

---

## Architecture Overview
- `index.js` — App entrypoint, middleware, CORS, and route mounting
- `src/router/*` — Route definitions grouped by resource (user, company, job, application)
- `src/controllers/*` — Controllers implement business logic and response shaping
- `src/models/*` — Mongoose schemas and model definitions
- `src/middlewares/*` — Auth and upload middleware (JWT guard, multer)
- `src/utils/*` — Reusable helpers (DB connection, Cloudinary config, DataURI)

---

## Quickstart (Local)
1. Install dependencies

```powershell
cd backend
npm install
```

2. Create `.env` in `backend/` and set the required variables (example below)

```text
MONGO_URI=your_mongo_connection_string
PORT=4000
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_KEY_SECRETE=your_cloudinary_api_secret
```

3. Run the server

```powershell
npm start
```

The server listens on `process.env.PORT` (default 4000) and mounts API under `/api/v1`.

---

## Important Environment Variables
- `MONGO_URI` — MongoDB connection string used by `src/utils/db.js`
- `JWT_SECRET` — HMAC secret used to sign/verify JWTs in `src/middlewares/requireAuth.js`
- `CLOUD_NAME`, `API_KEY`, `API_KEY_SECRETE` — Cloudinary credentials configured in `src/utils/cloudinary.js`

---

## API Summary
Base path: `/api/v1`

- User: `/api/v1/user`
  - `POST /register` — Register a new user (multipart single file upload supported)
  - `POST /login` — Login, returns auth cookie
  - `GET /logout` — Logout (clear cookie)
  - `PATCH /profile/update` — Update profile (protected)

- Company: `/api/v1/company` (protected)
  - `POST /register` — Register company profile
  - `GET /get` — Get companies
  - `GET /get/:id` — Get company by id
  - `PATCH /update/:id` — Update company (multipart single file upload)

- Job: `/api/v1/job` (protected)
  - `POST /post` — Post a job
  - `GET /get` — Get all jobs
  - `GET /getadminjobs` — Get jobs for admin
  - `GET /get/:id` — Get job by id

- Application: `/api/v1/application` (protected)
  - `GET /apply/:id` — Apply to a job
  - `GET /get` — Get applied jobs for the current user
  - `GET /applicant/:id` — Get applicants for a job
  - `POST /status/update/:id` — Update application status

For full request/response shapes, see the controllers in `src/controllers/`.

---

## Code Map (Key Files)
- `index.js` — App bootstrap and route mounting
- `src/utils/db.js` — MongoDB connection (exports `connectDB()`)
- `src/utils/cloudinary.js` — Cloudinary configuration
- `src/utils/datauri.js` — Convert `multer` buffer to data URI for upload
- `src/middlewares/multer.js` — `singleUpload` middleware for single-file uploads
- `src/middlewares/requireAuth.js` — JWT cookie authentication guard
- `src/models/` — `user.model.js`, `company.model.js`, `jobs.model.js`, `application.model.js`
- `src/controllers/` — Controller logic for each resource
- `src/router/` — Route definitions wired to controllers

---

## Developer Notes & Tips
- The project uses cookie-stored JWTs. Update `requireAuth` if you prefer Authorization headers.
- Image uploads use in-memory `multer` storage plus `datauri` to send to Cloudinary.
- CORS origin is configured in `index.js` (adjust for local dev at `http://localhost:5173`).

---

## How to Showcase This on a Resume
- Title: "Backend API for Job Portal — Node.js, Express, MongoDB"
- Bullet examples:
  - Designed and implemented a production-ready REST API with JWT authentication and Cloudinary-backed file uploads.
  - Modeled domain entities using Mongoose schemas and implemented CRUD and business workflows across Users, Companies, Jobs, and Applications.
  - Ensured separation of concerns via controllers, routers, and middleware for maintainability and testability.

---

## Contributing
- Fork → branch → PR. Keep changes scoped and add tests for new logic.

---

## License
This repository uses the ISC license as declared in `package.json`.

---

More details and examples of requests can be added to this README on demand.
