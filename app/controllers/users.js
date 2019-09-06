const { signUp } = require('../services/users');
const { encryptPassword } = require('../helpers/bcrypt');

const signUpRequest = (req, res, next) => {
  const { email, password, name, lastName } = req.body;

  const hashedPassword = encryptPassword(password);

  signUp(email, hashedPassword, name, lastName)
    .then(user => {
      res.send(`The user ${user.name} ${user.lastName} was successfully created`);
    })
    .catch(next);
};

module.exports = {
  signUpRequest
};
