const { validationResult } = require('express-validator');
const { validationUserError } = require('../errors');

exports.expressValidator = (req, res, next) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    const errorsMessages = errors.map(error => error.msg);
    next(validationUserError(`Errors: ${errorsMessages}`));
  }

  next();
};
