const { validationResult } = require('express-validator');
const { validationUserError } = require('../errors');
const { findUserByEmail } = require('../services/users');
const { checkPassword } = require('../helpers/bcrypt');

exports.validateSignIn = async (req, res, next) => {
  const { errors } = validationResult(req);
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (user === null) next(validationUserError(`The user with email ${email} doesn't exists`));
  if (!checkPassword(password, user.password)) next(validationUserError('The password is incorrect'));

  if (errors.length > 0) {
    const errorsMessages = errors.map(error => error.msg);
    next(validationUserError(`Errors: ${errorsMessages}`));
  }

  next();
};
