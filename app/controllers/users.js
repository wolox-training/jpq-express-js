const { signUp, findUserByEmail, getUsers } = require('../services/users');
const { encryptPassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

const signUpRequest = (req, res, next) => {
  const { email, password, name, lastName } = req.body;

  const hashedPassword = encryptPassword(password);

  signUp(email, hashedPassword, name, lastName)
    .then(user => {
      res.send(`The user ${user.name} ${user.lastName} was successfully created`);
    })
    .catch(next);
};

const signInRequest = async (req, res) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  res.send({ token: createToken(user) });
};

const getUsersRequest = (req, res, next) => {
  const { limit, offset } = req.query;
  getUsers(limit, offset)
    .then(users => res.send(users))
    .catch(next);
};

module.exports = {
  signUpRequest,
  signInRequest,
  getUsersRequest
};
