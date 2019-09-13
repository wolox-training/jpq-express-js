const moment = require('moment');
const { ExpirationToken } = require('../models');
const { databaseError } = require('../errors');
const logger = require('../logger/index');

exports.invalidateAllSessions = () =>
  ExpirationToken.create({ expiredOn: moment() })
    .then(result => {
      logger.info('All tokens was deactivated');
      return result.dataValues;
    })
    .catch(error => {
      logger.error(error.message);
      throw databaseError(error.message);
    });

exports.getLastInvalidation = () =>
  ExpirationToken.findOne({
    order: [['expiredOn', 'DESC']],
    attributes: ['expiredOn']
  }).catch(error => {
    logger.error(error.message);
    throw databaseError(error.message);
  });
