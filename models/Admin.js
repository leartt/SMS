'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    name: {
      type: DataTypes.STRING,
      notEmpty: { msg: 'Please enter a name' }
    },
    surname: {
      type: DataTypes.STRING,
      notEmpty: { msg: 'Please enter a surname' }
    },
    address: {
      type: DataTypes.STRING,
      notEmpty: { msg: 'Please enter an address' }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      notEmpty: { msg: 'Please enter a date' }
    },
    phone: {
      type: DataTypes.STRING,
      notEmpty: { msg: 'Please enter a number' }
    },
    photo_path: {
      type: DataTypes.STRING,
    }
  }, {});
  Admin.associate = function (models) {
    // associations can be defined here
    Admin.belongsTo(models.User)
  };
  return Admin;
};
