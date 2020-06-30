'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: 'Please enter a valid email' },
        notEmpty: { msg: 'Please enter an email' },
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Please enter a password' },
      }
    },
    role: {
      type: DataTypes.STRING,
      notEmpty: { msg: 'Please choose a role' },
    },
    confirmedEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Parent)
    User.hasMany(models.Teacher)
    User.hasMany(models.Student)
    User.hasMany(models.Admin)
  };
  return User;
};