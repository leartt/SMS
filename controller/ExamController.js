// const Feedback = require('../models').Feedback;
// const Teacher = require('../models').Teacher;
// const Parent = require('../models').Parent;
const Exam = require('../models/Exam');
const Classroom = require('../models').Classroom;

// var PdfPrinter = require('pdfmake');
// var fs = require('fs');

exports.create = async (req, res) => {
    try {
        console.log(req.body.classroom);
        const classroom = await Classroom.findOne({
            where: { id: req.body.classroom }, attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        const exam = new Exam({
            name: req.body.name,
            date: req.body.date,
            time: req.body.time,
            classroom: classroom.dataValues,
            course: req.body.course
        });
        const createdExam = await exam.save();
        res.status(200).json({ createdExam, msg: 'Exam has been created successfully', success: true })
    } catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
};


exports.findOne = async (req, res) => {
    try {
        const exam = await Exam.findOne({ _id: req.params.id });
        res.status(200).json({ exam, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}


exports.findExams = async (req, res) => {
    try {
        const exams = await Exam.find().populate('course');
        res.status(200).json({ exams, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}

exports.delete = async (req, res) => {
    try {
        await Exam.deleteOne({ _id: req.params.id })
        res.status(200).json({ msg: 'Exam has been deleted succesfully', success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
}