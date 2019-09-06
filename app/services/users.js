const { User } = require('../models');
const { databaseError } = require('../errors');
const logger = require('../logger/index');

const findUserByEmail = email =>
  User.findOne({ where: { email } }).catch(error => {
    throw databaseError(error.message);
  });

const signUp = (email, password, name, lastName) =>
  User.create({ email, password, name, lastName })
    .then(result => {
      logger.info(`The user ${result.dataValues.name} ${result.dataValues.latName} was successfully created`);
      return result.dataValues;
    })
    .catch(error => {
      logger.error(error.message);
      throw databaseError(error.message);
    });

module.exports = {
  findUserByEmail,
  signUp
};
