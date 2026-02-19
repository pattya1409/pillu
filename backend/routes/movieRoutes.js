import express from 'express';
import {
  searchMovies,
  getMovieById,
  getTrendingMovies,
} from '../controllers/movieController.js';

const router = express.Router();

router.get('/trending', getTrendingMovies);
router.get('/search', searchMovies);
router.get('/:id', getMovieById);

export default router;
