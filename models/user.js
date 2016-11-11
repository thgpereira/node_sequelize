'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: function (username, done) {
          User.find({
            where:
            {
              username: username
            }
          }).done(function (user) {
            if (user) {
              done('Usuário já cadastrado');
            } else {
              done();
            }
          });
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
  return User;
};