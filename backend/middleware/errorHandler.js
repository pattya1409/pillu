export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({
      success: false,
      message,
      stack: err.stack,
    });
  } else {
    res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? 'Internal Server Error' : message,
    });
  }
};
