const jwt = require('jwt-simple');
const moment = require('moment');
const { secret } = require('../../config').common.auth;
const { expired_quantity, expired_measure } = require('../../config').common.session;
const { tokenError } = require('../errors');

const createToken = user => {
  const expireOn = moment().add(expired_quantity, expired_measure);

  const payload = {
    sub: user.id,
    userId: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
    iat: moment().unix(),
    exp: expireOn.unix()
  };

  return {
    token: jwt.encode(payload, secret),
    expire_on: expireOn.format('YYYY-MM-DD HH:mm:ss')
  };
};

const decodeToken = token => {
  try {
    const payload = jwt.decode(token, secret);

    if (!payload.exp || payload.exp <= moment().unix()) throw tokenError('The token was expired');

    return payload;
  } catch (error) {
    throw tokenError(error.message);
  }
};

module.exports = {
  createToken,
  decodeToken
};
