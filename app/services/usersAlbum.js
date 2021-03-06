const { UserAlbum } = require('../models');
const { databaseError } = require('../errors');
const logger = require('../logger/index');

const create = (userId, albumId) =>
  UserAlbum.create({ userId, albumId })
    .then(result => {
      logger.info(`The userAlbum was created userId: ${userId},  albumId: ${albumId}`);
      return result.dataValues;
    })
    .catch(error => {
      logger.error(error.message);
      throw databaseError(error.message);
    });

module.exports = {
  create
};
