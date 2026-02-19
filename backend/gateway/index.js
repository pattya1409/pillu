import express from 'express';
import morgan from 'morgan';
import authRoutes from '../routes/authRoutes.js';
import movieRoutes from '../routes/movieRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import { errorHandler } from '../middleware/errorHandler.js';

const router = express.Router();

router.use(
  morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', {
    skip: () => process.env.NODE_ENV === 'test',
  })
);

router.use('/auth', authRoutes);
router.use('/movies', movieRoutes);
router.use('/user', userRoutes);

router.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

router.use(errorHandler);

export default router;
