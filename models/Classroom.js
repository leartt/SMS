'use strict';
module.exports = (sequelize, DataTypes) => {
  const Classroom = sequelize.define('Classroom', {
    name: {
      type: DataTypes.STRING,
      notEmpty: { msg: 'Please provide a class name' }
    },
    capacity: {
      type: DataTypes.INTEGER,
      notEmpty: { msg: 'Please provide a class capacity' }
    }
  }, {});
  Classroom.associate = function (models) {
    // associations can be defined here
    Classroom.hasMany(models.Student)
    Classroom.hasMany(models.Teacher)
  };
  return Classroom;
};