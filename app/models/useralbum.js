'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAlbum = sequelize.define(
    'UserAlbum',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        unique: 'user_album_unique'
      },
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'user_album_unique'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
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
  );
  UserAlbum.associate = models => {
    UserAlbum.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return UserAlbum;
};
