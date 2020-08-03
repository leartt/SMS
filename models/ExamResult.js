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
        type: Object,
        required: true
    }
});

const ExamResult = mongoose.model('ExamResults', ExamResultSchema);

module.exports = ExamResult;