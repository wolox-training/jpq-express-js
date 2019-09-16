'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'UserAlbums',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          },
          unique: 'user_album_unique'
        },
        albumId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: 'user_album_unique'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      {
        uniqueKeys: {
          user_album_unique: {
            name: 'Unique value per user and album',
            singleField: false,
            fields: ['userId', 'albumId']
          }
        }
      }
    ),
  down: queryInterface => queryInterface.dropTable('UserAlbums')
};
