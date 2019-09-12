const { signUp, findUserByEmail, getUsers, updateIsAdminUser } = require('../services/users');
const { encryptPassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

const signUpRequest = (req, res, next) => {
  const { email, password, name, lastName } = req.body;

  const hashedPassword = encryptPassword(password);

  signUp({ email, password: hashedPassword, name, lastName })
    .then(user => {
      res.send(`The user ${user.name} ${user.lastName} was successfully created`);
    })
    .catch(next);
};

const signInRequest = (req, res) => {
  const { user } = req;

  res.send(createToken(user));
};

const getUsersRequest = (req, res, next) => {
  const { limit, offset } = req.query;
  getUsers(limit, offset)
    .then(users => res.send(users))
    .catch(next);
};

const userAdminRequest = async (req, res, next) => {
  const { email, password, name, lastName } = req.body;

  const user = await findUserByEmail(email);

  if (user === null) {
    const hashedPassword = encryptPassword(password);
    const isAdmin = true;

    signUp({ email, password: hashedPassword, name, lastName, isAdmin })
      .then(newUser => {
        res.send(`The user ${newUser.name} ${newUser.lastName} was successfully created`);
      })
      .catch(next);
  }

  updateIsAdminUser(user.id)
    .then(res.send(`The user ${user.name} ${user.lastName} now is admin`))
    .catch(next);
};

module.exports = {
  signUpRequest,
  signInRequest,
  getUsersRequest,
  userAdminRequest
};
