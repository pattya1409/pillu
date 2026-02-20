# Deployment Guide

## Frontend Deployment (Vercel)

### Option 1: Deploy from Vercel Dashboard
1. Go to Vercel Dashboard
2. Import your GitHub repository: `https://github.com/pattya1409/pillu.git`
3. Configure settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variable:
   - `VITE_API_BASE_URL` = Your backend URL (see backend deployment below)

### Option 2: Deploy from Root (Current Setup)
The `vercel.json` is configured to deploy the frontend from the root.
Just redeploy and it should work.

## Backend Deployment (Choose One)

Your backend needs a platform that supports Node.js servers:

### Recommended: Render.com (Free Tier Available)
1. Go to https://render.com
2. Create a new Web Service
3. Connect your GitHub repo
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `PORT` = 10000 (or leave default)
     - `MONGO_URI` = Your MongoDB connection string
     - `JWT_SECRET` = Your secret key
     - `OMDB_API_KEY` = 2005fde8
     - `FRONTEND_URL` = Your Vercel frontend URL

### Alternative: Railway.app
1. Go to https://railway.app
2. Create new project from GitHub
3. Add environment variables (same as above)
4. Deploy

### Alternative: Heroku
1. Install Heroku CLI
2. Run:
   ```bash
   cd backend
   heroku create your-app-name
   heroku config:set MONGO_URI=your_mongo_uri
   heroku config:set JWT_SECRET=your_secret
   heroku config:set OMDB_API_KEY=2005fde8
   git push heroku main
   ```

## After Deployment

1. Get your backend URL (e.g., `https://your-app.onrender.com`)
2. Update Vercel environment variable:
   - `VITE_API_BASE_URL` = `https://your-app.onrender.com/api`
3. Redeploy frontend on Vercel

## MongoDB Setup

Use MongoDB Atlas (free tier):
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Add to backend environment variables
