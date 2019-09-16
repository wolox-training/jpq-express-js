const { externalError } = require('../errors');

exports.handleError = (error, albumId) => {
  const message = error.statusCode === 404 ? `The album with id ${albumId} doesn't exists` : error.message;
  throw externalError(message);
};
