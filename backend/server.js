import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import apiGateway from './gateway/index.js';

const app = express();

connectDB();

app.use(
  cors({
    origin:
      env.nodeEnv === 'production'
        ? process.env.FRONTEND_URL || 'http://localhost:5173'
        : '*',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiGateway);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
});
