const { signUp } = require('../services/users');

const signUpRequest = (req, res) => {
  signUp(req.body);
  res.send('HW');
};

module.exports = {
  signUpRequest
};
