const { User } = require('../models');

exports.validateUser = async (req, res, next) => {
  const regExpMail = '^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\\.)?[a-zA-Z]+\\.)?(wolox)\\.(co|ar)$';
  const regExpPassword = '^[a-zA-Z0-9]*$';

  const userAlreadyExists = await User.findOne({ where: { email: req.body.email } });
  const validPassword = req.body.password.length > 8 && req.body.password.match(regExpPassword);

  if (userAlreadyExists !== null) next(new Error('The user with email has exists'));

  if (req.body.email.match(regExpMail) && validPassword) next();
  next(new Error('Email or password incorrect'));
};
