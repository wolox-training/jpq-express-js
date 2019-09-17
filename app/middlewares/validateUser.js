const moment = require('moment');
const { validationUserError } = require('../errors');
const { findUserByEmail } = require('../services/users');
const { getLastInvalidation } = require('../services/expirationToken');
const { decodeToken } = require('../helpers/jwt');
const { tokenError } = require('../errors');

const validateUser = async (req, res, next) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (user !== null) next(validationUserError(`The email ${email} already exists`));

  next();
};

const userIsAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw validationUserError('The authorization token is required');

  const lastInvalidationToken = await getLastInvalidation();

  const token = authorization.split(' ')[1];
  const payload = decodeToken(token);

  if (lastInvalidationToken !== null && moment(lastInvalidationToken.expiredOn).unix() >= payload.iat)
    next(tokenError('The token was expired'));

  req.user = payload;
  next();
};

const validateAdminUser = async (req, res, next) => {
  if (!req.user.isAdmin) next(validationUserError('The user must be admin'));

  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (user !== null && user.isAdmin) next(validationUserError('The user is admin'));

  next();
};

module.exports = {
  validateUser,
  userIsAuth,
  validateAdminUser
};
