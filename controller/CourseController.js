// const Feedback = require('../models').Feedback;
// const Teacher = require('../models').Teacher;
// const Parent = require('../models').Parent;
const Course = require('../models/Course');

// var PdfPrinter = require('pdfmake');
// var fs = require('fs');

exports.create = async (req, res) => {
    try {
        
        const course = new Course({
            name: req.body.name,
            teacher: req.body.teacher
        });
        await course.save();
        res.status(200).json({ course, msg: 'Course has been created successfully', success: true })
    } catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
};


exports.findOne = async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id });
        res.status(200).json({ course, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}


exports.findCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ courses, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}

exports.delete = async (req, res) => {
    try {
        await Course.deleteOne({ _id: req.params.id })
        res.status(200).json({ msg: 'Course has been deleted succesfully', success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
}