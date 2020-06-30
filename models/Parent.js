'use strict';
module.exports = (sequelize, DataTypes) => {
  const Parent = sequelize.define('Parent', {
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
  Parent.associate = function (models) {
    // associations can be defined here
    Parent.belongsTo(models.User);
    Parent.hasMany(models.Student);
    Parent.hasMany(models.Feedback);
  };
  return Parent;
};