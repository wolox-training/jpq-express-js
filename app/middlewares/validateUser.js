const { validationResult } = require('express-validator');
const { validationUserError } = require('../errors');
const { findUserByEmail } = require('../services/users');
const { decodeToken } = require('../helpers/jwt');

const validateUser = async (req, res, next) => {
  const { errors } = validationResult(req);
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (user !== null) next(validationUserError(`The email ${email} already exists`));

  if (errors.length > 0) {
    const errorsMessages = errors.map(error => error.msg);
    next(validationUserError(`Errors: ${errorsMessages}`));
  }

  next();
};

const userIsAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw validationUserError('The authorization token is required');

  const token = authorization.split(' ')[1];

  req.user = decodeToken(token);
  next();
};

const validateAdminUser = async (req, res, next) => {
  if (!req.user.isAdmin) next(validationUserError('The user must be admin'));

  const { errors } = validationResult(req);
  const { email } = req.body;

  if (errors.length > 0) {
    const errorsMessages = errors.map(error => error.msg);
    next(validationUserError(`Errors: ${errorsMessages}`));
  }

  const user = await findUserByEmail(email);

  if (user !== null && user.isAdmin) next(validationUserError('The user is admin'));

  next();
};

module.exports = {
  validateUser,
  userIsAuth,
  validateAdminUser
};
