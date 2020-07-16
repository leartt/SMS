const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    teacher: {
        type: Object,
        required: true
    }
});

const Course = mongoose.model('Courses', CourseSchema);

module.exports = Course;