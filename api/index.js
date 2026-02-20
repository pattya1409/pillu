import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from '../backend/config/db.js';
import { env } from '../backend/config/env.js';
import apiGateway from '../backend/gateway/index.js';

const app = express();

// Connect to MongoDB (Vercel will handle connection pooling)
let isConnected = false;

async function ensureDbConnection() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', async (req, res, next) => {
  await ensureDbConnection();
  next();
}, apiGateway);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Export for Vercel serverless
export default app;
