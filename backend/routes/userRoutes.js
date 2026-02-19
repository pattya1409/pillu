import express from 'express';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/favorites', getFavorites);
router.post('/favorites', addFavorite);
router.delete('/favorites/:imdbID', removeFavorite);

export default router;
