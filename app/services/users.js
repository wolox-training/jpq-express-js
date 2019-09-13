const { User } = require('../models');
const { databaseError } = require('../errors');
const logger = require('../logger/index');

const findUserByEmail = email =>
  User.findOne({ where: { email } }).catch(error => {
    throw databaseError(error.message);
  });

const signUp = user =>
  User.create(user)
    .then(result => {
      logger.info(`The user ${result.dataValues.name} ${result.dataValues.latName} was successfully created`);
      return result.dataValues;
    })
    .catch(error => {
      logger.error(error.message);
      throw databaseError(error.message);
    });

const getUsers = (limit = 10, offset = 0) =>
  User.findAll({
    limit,
    offset,
    attributes: ['id', 'name', 'lastName', 'email', 'isAdmin']
  }).catch(error => {
    throw databaseError(error.message);
  });

const updateIsAdminUser = id =>
  User.update({ isAdmin: true }, { where: { id } })
    .then(result => {
      logger.info('The user now is admin !!');
      return result.dataValues;
    })
    .catch(error => {
      logger.error(error.message);
      throw databaseError(error.message);
    });

module.exports = {
  findUserByEmail,
  signUp,
  getUsers,
  updateIsAdminUser
};
