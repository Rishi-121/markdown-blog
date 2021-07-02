const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.json({
    message: err.message,
    success: false,
  });
};

module.exports = { notFound, errorHandler };
