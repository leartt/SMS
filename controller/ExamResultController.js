// const Feedback = require('../models').Feedback;
// const Teacher = require('../models').Teacher;
// const Parent = require('../models').Parent;
const ExamResult = require('../models/ExamResult');
const upload = require('../fileUploader');

// var PdfPrinter = require('pdfmake');
// var fs = require('fs');

exports.create = [upload.single('filePath'), async (req, res) => {
    try {
        const examResult = new ExamResult({
            name: req.body.name,
            filePath: req.file.path
        });
        const createdExamResult = await examResult.save();
        res.status(200).json({ createdExamResult, msg: 'Exam Result has been created successfully', success: true })
    } catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
}];


exports.findOne = async (req, res) => {
    try {
        const examResult = await ExamResult.findOne({ _id: req.params.id });
        res.status(200).json({ examResult, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}


exports.findExamsResult = async (req, res) => {
    try {
        const examsResult = await ExamResult.find()
        res.status(200).json({ examsResult, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}

exports.delete = async (req, res) => {
    try {
        await ExamResult.deleteOne({ _id: req.params.id })
        res.status(200).json({ msg: 'Exam result has been deleted succesfully', success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
}