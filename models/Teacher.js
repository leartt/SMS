'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
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
    },
    salary: {
      type: DataTypes.STRING,
    }

  }, {});
  Teacher.associate = function (models) {
    // associations can be defined here
    Teacher.belongsTo(models.User);
    Teacher.hasMany(models.Assignment)
    Teacher.belongsTo(models.Classroom, { foreignKey: 'classroomId'})
    Teacher.hasMany(models.Feedback);
  };
  return Teacher;
};