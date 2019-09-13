'use strict';
module.exports = (sequelize, DataTypes) =>
  sequelize.define('ExpirationToken', {
    expiredOn: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });
