const Teacher = require('../models').Teacher;
const User = require('../models').User;
const Classroom = require('../models').Classroom;
const Feedback = require('../models').Feedback;

const checkPermission = require('../permission');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const upload = require('../uploader');

const { Op } = require('sequelize');

exports.create = [upload.single('photo_path'), async (req, res) => {
    try {
        checkPermission(req.user.role, 'ADMIN');

        const emailExist = await User.findOne({ where: { email: req.body.email } });
        if (emailExist) {
            return res.status(400).json({ msg: 'This email already exists', success: false })
        }

        let { email, password, role, name, surname, address, phone, birthday, classroomId } = req.body;

        const user = {
            email,
            password,
            role
        };
        const teacher = {
            name,
            surname,
            address,
            phone,
            birthday,
            photo_path: req.file.path,
            classroomId
        }
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;

        const registeredUser = await User.create(user);
        const registeredTeacher = await registeredUser.createTeacher(teacher);

        return res.status(200).json({
            success: true,
            registeredTeacher: [registeredUser, registeredTeacher],
            msg: "Teacher is now registered"
        });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false });
    }
}];

exports.updateTeacher = async (req, res) => {
    try {
        checkPermission(req.user.role, 'ADMIN');
        let { name, surname, address, phone, birthday, salary } = req.body;

        const updatedTeacher = await Teacher.update({
            name,
            surname,
            address,
            phone,
            birthday,
            salary,
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                }
            ]
        },
            { where: { id: req.params.id } }
        )

        res.status(200).json({ updatedTeacher, msg: 'Teacher has been updated succesfully', success: true })
    }
    catch (err) {
        res.status(400).json({ err })
    }
}

exports.findOne = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                },
                {
                    model: Classroom
                },
                {
                    model: Feedback
                },
            ]
        });
        res.status(200).json({ teacher, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}


exports.findTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                },
                {
                    model: Classroom
                },
                {
                    model: Feedback
                }
            ]
        });
        res.status(200).json({ teachers, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}

exports.delete = async (req, res) => {
    try {
        checkPermission(req.user.role, 'ADMIN');
        const teacher = await Teacher.findOne({ where: { UserId: req.params.id } })
        const deletedUser = await User.destroy({
            where: {
                [Op.and]: [{ id: req.params.id }, { role: 'teacher' }]
            },
        });
        await fs.unlink(teacher.photo_path, err => {
            if (err) throw err;
        })
        res.status(200).json({ deletedUser, msg: 'Teacher has been deleted succesfully', success: true });
    }

    catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
}

