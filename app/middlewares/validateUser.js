const { validationUserError } = require('../errors');
const { findUserByEmail } = require('../services/users');
const { decodeToken } = require('../helpers/jwt');

const validateUser = async (req, res, next) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (user !== null) return next(validationUserError(`The email ${email} already exists`));

  return next();
};

const userIsAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw validationUserError('The authorization token is required');

  const token = authorization.split(' ')[1];

  req.user = decodeToken(token);
  next();
};

const validateAdminUser = async (req, res, next) => {
  if (!req.user.isAdmin) return next(validationUserError('The user must be admin'));

  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (user !== null && user.isAdmin) return next(validationUserError('The user is admin'));

  return next();
};

const validateUserId = (req, res, next) => {
  const { id } = req.params;

  if (!id) return next('The userId is a required param');

  return next();
};

module.exports = {
  validateUser,
  userIsAuth,
  validateAdminUser,
  validateUserId
};
