const { validationResult } = require('express-validator');
const { validationUserError } = require('../errors');
const { userAlreadyExists } = require('../services/users');

exports.validateUser = async (req, res, next) => {
  const { errors } = validationResult(req);
  const { email } = req.body;

  const user = await userAlreadyExists(email);

  if (user !== null) next(validationUserError(`The email ${email} already exists`));

  if (errors.length > 0) {
    const errorsMessages = errors.map(error => error.msg);
    next(validationUserError(`Errors: ${errorsMessages}`));
  }

  next();
};
