const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    classroom: {
        type: Object,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Courses'
    }
});

const Exam = mongoose.model('Exams', ExamSchema);

module.exports = Exam;