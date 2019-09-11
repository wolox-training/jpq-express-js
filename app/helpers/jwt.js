const jwt = require('jwt-simple');
const moment = require('moment');
const { secret } = require('../../config').common.auth;
const { tokenError } = require('../errors');

const createToken = user => {
  const payload = {
    sub: user.id,
    email: user.email,
    iat: moment().unix()
  };

  return jwt.encode(payload, secret);
};

const decodeToken = token => {
  try {
    const payload = jwt.decode(token, secret);

    return payload;
  } catch (error) {
    throw tokenError(error.message);
  }
};

module.exports = {
  createToken,
  decodeToken
};
