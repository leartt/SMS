'use strict';
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    description: {
      type: DataTypes.STRING,
      notEmpty: { msg: 'Please enter a description' },
    },
  }, {});
  Feedback.associate = function (models) {
    // associations can be defined here
    Feedback.belongsTo(models.Parent, { foreignKey: 'parentId'});
    Feedback.belongsTo(models.Teacher, { foreignKey: 'teacherId'});
  };
  return Feedback;
};