const Student = require('../models').Student;
const Grade = require('../models/Grade');

// var PdfPrinter = require('pdfmake');
// var fs = require('fs');

exports.create = async (req, res) => {
    try {
        console.log(req.body.studentId);
        const student = await Student.findOne({where: { id: req.body.studentId }});
        const grade = new Grade({
            student: student.dataValues,
            grade: req.body.grade,
            course: req.body.course,
            points: req.body.points
        });
        const createdGrade = await grade.save();
        res.status(200).json({ createdGrade, msg: 'Grade has been added successfully', success: true })
    } catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
};


exports.findOne = async (req, res) => {
    try {
        const grade = await Grade.findOne({ _id: req.params.id }).populate('course');
        res.status(200).json({ grade, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}


exports.findGrades = async (req, res) => {
    try {
        const grades = await Grade.find().populate('course');
        res.status(200).json({ grades, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}

exports.delete = async (req, res) => {
    try {
        await Grade.deleteOne({ _id: req.params.id })
        res.status(200).json({ msg: 'Grade has been deleted succesfully', success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
}