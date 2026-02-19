import axios from 'axios';

const OMDB_BASE_URL = 'https://www.omdbapi.com/';

const fetchOMDB = async (params) => {
  const response = await axios.get(OMDB_BASE_URL, {
    params: {
      apikey: process.env.OMDB_API_KEY,
      ...params,
    },
  });

  if (response.data.Response === 'False') {
    throw new Error(response.data.Error || 'Movie not found');
  }

  return response.data;
};

export const searchMovies = async (req, res, next) => {
  try {
    const { title, page = 1 } = req.query;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search title',
      });
    }

    const data = await fetchOMDB({
      s: title.trim(),
      page: Number(page),
      type: 'movie',
    });

    res.status(200).json({
      success: true,
      data: {
        movies: data.Search || [],
        totalResults: parseInt(data.totalResults, 10) || 0,
      },
    });
  } catch (error) {
    if (error.response?.data?.Error) {
      return res.status(404).json({
        success: false,
        message: error.response.data.Error,
      });
    }
    next(error);
  }
};

export const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Movie ID is required',
      });
    }

    const data = await fetchOMDB({ i: id, plot: 'full' });

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    if (error.response?.data?.Error) {
      return res.status(404).json({
        success: false,
        message: error.response.data.Error,
      });
    }
    next(error);
  }
};

export const getTrendingMovies = async (req, res, next) => {
  try {
    const popularSearches = [
      'avengers',
      'batman',
      'superman',
      'inception',
      'matrix',
      'interstellar',
    ];
    const randomSearch =
      popularSearches[Math.floor(Math.random() * popularSearches.length)];

    const data = await fetchOMDB({
      s: randomSearch,
      type: 'movie',
    });

    res.status(200).json({
      success: true,
      data: {
        movies: data.Search || [],
        totalResults: parseInt(data.totalResults, 10) || 0,
      },
    });
  } catch (error) {
    if (error.response?.data?.Error) {
      return res.status(404).json({
        success: false,
        message: error.response.data.Error,
      });
    }
    next(error);
  }
};
