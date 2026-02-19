import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  omdbApiKey: process.env.OMDB_API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
};
