'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    description:{
      type: DataTypes.STRING,
      notEmpty: {msg: "Not empty please!"}
    },
    dateToComplete: DataTypes.DATEONLY
  }, {});
  Assignment.associate = function (models) {
    // associations can be defined here
    Assignment.belongsTo(models.Teacher, {foreignKey: "teacherId"});
  };
  return Assignment;
};