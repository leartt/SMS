const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExamResultSchema = new Schema({
    filePath: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Exams'
    }
});

const ExamResult = mongoose.model('ExamResults', ExamResultSchema);

module.exports = ExamResult;