const { validationUserError } = require('../errors');
const { findUserByEmail } = require('../services/users');
const { decodeToken } = require('../helpers/jwt');

const validateUser = async (req, res, next) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (user !== null) next(validationUserError(`The email ${email} already exists`));

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

  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (user !== null && user.isAdmin) next(validationUserError('The user is admin'));

  next();
};

const validateUserId = (req, res, next) => {
  const { id } = req.params;

  if (!id) next('The userId is a required param');

  next();
};

module.exports = {
  validateUser,
  userIsAuth,
  validateAdminUser,
  validateUserId
};
