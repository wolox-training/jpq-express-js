const jwt = require('jwt-simple');
const moment = require('moment');
const { secret } = require('../../config').common.auth;
const { tokenError } = require('../errors');

const createToken = user => {
  const payload = {
    sub: user.id,
    userId: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
    iat: moment().unix()
  };

  return jwt.encode(payload, secret);
};

const decodeToken = token => {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, secret);

      resolve(payload);
    } catch (error) {
      reject(tokenError(error.message));
    }
  });

  return decoded;
};

module.exports = {
  createToken,
  decodeToken
};
