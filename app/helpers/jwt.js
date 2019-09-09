const jwt = require('jwt-simple');
const moment = require('moment');
const { secret } = require('../../config').common.auth;

const createToken = user => {
  const payload = {
    sub: user.id,
    email: user.email,
    iat: moment().unix()
  };

  return jwt.encode(payload, secret);
};

module.exports = {
  createToken
};
