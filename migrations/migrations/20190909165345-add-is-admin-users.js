'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Users', 'isAdmin', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }),
  down: queryInterface => Promise.all([queryInterface.removeColumn('Users', 'isAdmin')])
};
