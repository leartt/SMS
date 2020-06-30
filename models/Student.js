'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
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
    averageGrade: {
      type: DataTypes.STRING
    }
  }, {});
  Student.associate = function (models) {
    // associations can be defined here
    Student.belongsTo(models.User)
    Student.belongsTo(models.Parent, { foreignKey: 'parentId' })
    Student.belongsTo(models.Classroom, { foreignKey: 'classroomId'})
  };
  return Student;
};