const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GradeSchema = new Schema({
    student: {
        type: Object,
    },
    // foreignKey or reference to course
    course: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Courses'
    },
    grade: {
        type: Number,
        required: true,
    },
    points: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    },
});

const Grade = mongoose.model('Grades', GradeSchema);

module.exports = Grade;