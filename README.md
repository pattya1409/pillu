# Netflix-Style Movie Web Application

A production-ready full-stack movie application built with React, Node.js, Express, and MongoDB. Features OMDB API integration for movie data, JWT authentication, and a dark Netflix-inspired UI.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Context API
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT, bcrypt
- **External API:** OMDB API

## Features

- Browse trending movies
- Search movies by title
- View detailed movie information
- User registration and login
- Protected profile page
- Save favorite movies
- Responsive design (mobile + desktop)
- Loading states and error handling

## Project Structure

```
netflix-movie-app/
├── backend/
│   ├── config/          # DB and env config
│   ├── controllers/     # Route handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, error handling
│   ├── gateway/         # Centralized API gateway
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/         # API client & services
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Auth context
│   │   ├── pages/       # Page components
│   │   └── main.jsx
│   └── ...
├── package.json
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- [OMDB API Key](http://www.omdbapi.com/apikey.aspx) (free)

## Setup Instructions

### 1. Clone & Install

```bash
cd netflix-movie-app
npm run install:all
```

Or install manually:

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 2. Environment Variables

**Backend** – Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/netflix-movies
JWT_SECRET=your-super-secret-jwt-key-change-in-production
OMDB_API_KEY=your-omdb-api-key
FRONTEND_URL=http://localhost:5173
```

**Frontend** – Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> For local development with Vite proxy, `VITE_API_BASE_URL` can be left unset or set to `/api`. The `vite.config.js` proxies `/api` to the backend.

### 3. Run Development Servers

**Option A – Run both with one command:**

```bash
npm run dev
```

**Option B – Run separately:**

```bash
# Terminal 1 – Backend
cd backend && npm run dev

# Terminal 2 – Frontend
cd frontend && npm run dev
```

- Frontend: http://localhost:5173  
- Backend API: http://localhost:5000/api  

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/movies/trending` | Get trending movies |
| GET | `/api/movies/search?title=` | Search movies |
| GET | `/api/movies/:id` | Get movie by ID |
| GET | `/api/user/favorites` | Get user favorites (protected) |
| POST | `/api/user/favorites` | Add favorite (protected) |
| DELETE | `/api/user/favorites/:imdbID` | Remove favorite (protected) |

## Production Build

```bash
# Build frontend
cd frontend && npm run build

# Start backend (serves API only; frontend needs separate hosting)
cd backend && npm start
```

### Production Environment

**Backend `.env` (production):**

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/netflix-movies
JWT_SECRET=strong-random-secret
OMDB_API_KEY=your-omdb-api-key
FRONTEND_URL=https://your-frontend-domain.com
```

**Frontend build-time variables:**

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
```

## Deployment

### Backend (e.g., Render, Railway, Heroku)

1. Set environment variables in the platform dashboard.
2. Ensure MongoDB connection string is correct (e.g., Atlas URI).
3. Deploy and note the API URL.

### Frontend (e.g., Vercel, Netlify)

1. Set `VITE_API_BASE_URL` to your backend API URL.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Deploy.

### CORS

The backend uses CORS. In production, `FRONTEND_URL` should match your deployed frontend URL.

## License

MIT
