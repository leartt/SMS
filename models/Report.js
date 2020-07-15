const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    filePath: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }

});

const Report = mongoose.model('Reports', ReportSchema);

module.exports = Report;