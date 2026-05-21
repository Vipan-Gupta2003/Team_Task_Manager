# Team Task Manager

A full-stack task management platform designed for teams to manage projects, assign tasks, and track progress with modern UI and secure authentication.

## Features

- User authentication with JWT
- Role-based access control (`admin`, `member`)
- Project creation, membership and management
- Task assignment, status tracking and comments
- Dashboard analytics with charts
- Responsive React + Tailwind frontend
- Express.js API with MongoDB and Mongoose
- Security middleware: Helmet, CORS, rate limiting

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, React Hook Form, Chart.js
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

## Folder Structure

```
backend/
  controllers/
  middleware/
  models/
  routes/
  config/
  app.js
  server.js
frontend/
  src/
    components/
    context/
    pages/
    services/
    App.jsx
    main.jsx
    index.css
  vite.config.js
README.md
.gitignore
```

## Setup Instructions

### Backend

1. Navigate to `backend`
2. Copy `.env.example` to `.env`
3. Populate `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`
4. Run:

```bash
cd backend
npm install
npm run dev
```

### Frontend

1. Navigate to `frontend`
2. Copy `.env.example` to `.env`
3. Set `VITE_API_URL` to the backend API URL
4. Run:

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

### Projects

- `POST /api/projects`
- `GET /api/projects`
- `GET /api/projects/:id`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`
- `POST /api/projects/:id/members`

### Tasks

- `POST /api/tasks`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `PATCH /api/tasks/:id/status`
- `POST /api/tasks/:id/comments`

### Dashboard

- `GET /api/dashboard/stats`
- `GET /api/dashboard/analytics`

## Deployment

Deploy the backend and frontend to Railway or Vercel. Use MongoDB Atlas for production storage and add environment variables to the deployment configuration.

## Notes

- The frontend uses local storage for authentication persistence.
- Role-based access is enforced via middleware in the backend.
- Modify `CLIENT_URL` and `VITE_API_URL` to match your deployed environment.
