import User from '../models/User.js';

export const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      data: user.favorites,
    });
  } catch (error) {
    next(error);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    const { imdbID, title, poster, year } = req.body;

    if (!imdbID) {
      return res.status(400).json({
        success: false,
        message: 'Movie ID (imdbID) is required',
      });
    }

    const user = await User.findById(req.user._id);

    const exists = user.favorites.some(
      (fav) => fav.imdbID.toString() === imdbID.toString()
    );

    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Movie already in favorites',
      });
    }

    user.favorites.push({
      imdbID,
      title: title || '',
      poster: poster || '',
      year: year || '',
    });

    await user.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      data: user.favorites,
      message: 'Movie added to favorites',
    });
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    const { imdbID } = req.params;

    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(
      (fav) => fav.imdbID.toString() !== imdbID.toString()
    );
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: user.favorites,
      message: 'Movie removed from favorites',
    });
  } catch (error) {
    next(error);
  }
};
