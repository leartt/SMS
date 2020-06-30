const Classroom = require('../models').Classroom;
const Student = require('../models').Student;
const Teacher = require('../models').Teacher;

const checkPermission = require('../permission');


exports.create = async (req, res) => {
    try {
        let { name, capacity, studentId, teacherId } = req.body;
        capacity = Number(capacity);
        const classRoom = await Classroom.create({
            name,
            capacity,
            studentId,
            teacherId,
        })
        res.status(200).json({ msg: 'Classroom has been created succesfully', classRoom, success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false });
    }
};


exports.findOne = async (req, res) => {
    try {
        const classroom = await Classroom.findOne({
            where: { id: req.params.id },
            include: [
                { model: Parent },
                { model: Student }
            ]
        });
        res.status(200).json({ classroom, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}


exports.findClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.findAll({
            include: [
                {
                    model: Student,
                },
                {
                    model: Teacher,
                },
            ]
        });
        res.status(200).json({ classrooms, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}

exports.delete = async (req, res) => {
    try {
        // checkPermission(req.user.role, 'ADMIN');
        await Classroom.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json({ msg: 'Classroom has been deleted succesfully', success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
}

