const User = require('../models').User
const Student = require('../models').Student
const Parent = require('../models').Parent
const Classroom = require('../models').Classroom
const checkPermission = require('../permission');

const fs = require('fs');
const bcrypt = require('bcryptjs');
const upload = require('../uploader');

const { Op } = require('sequelize')

create = [upload.single('photo_path'), async (req, res) => {
    try {
        checkPermission(req.user.role, 'ADMIN');

        const emailExist = await User.findOne({ where: { email: req.body.email } });
        if (emailExist) {
            return res.status(400).json({ msg: 'This email already exists', success: false })
        }

        let { email, password, role, name, surname, address, phone, birthday, parentId, classroomId } = req.body;
        const user = {
            email,
            password,
            role
        };
        const student = {
            name,
            surname,
            address,
            phone,
            birthday,
            photo_path: req.file.path,
            parentId,
            classroomId
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                if (err) { console.log(err); throw (err) }
                try {
                    user.password = hash;
                    const registeredUser = await User.create(user)

                    const registeredStudent = await registeredUser.createStudent(student)
                    return res.status(200).json({
                        success: true,
                        registeredStudent: [registeredUser, registeredStudent],
                        msg: "Student is now registered"
                    });
                }
                catch (err) {
                    res.status(400).json({ msg: err, success: false })
                }
            });
        });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false });
    }

}]

updateStudent = async (req, res) => {
    try {
        checkPermission(req.user.role, 'ADMIN')
        let { name, surname, address, phone, birthday, parentId } = req.body;

        const updatedStudent = await Student.update({
            name,
            surname,
            address,
            phone,
            birthday,
            parentId,
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
        res.status(200).json({ updatedStudent, msg: 'Student has been updated succesfully', success: true })
    }
    catch (err) {
        res.status(400).json({ err })
    }
}

findOne = async (req, res) => {
    try {
        const student = await Student.findOne({
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
                }
            ]
        });
        res.status(200).json({ student, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}

findStudents = async (req, res) => {
    try {
        const students = await Student.findAll({
            include: [
                {
                    model: Parent,
                },
                {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                },
                {
                    model: Classroom
                }
            ]
        });
        res.status(200).json({ students, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}

deleteStudent = async (req, res) => {
    try {
        checkPermission(req.user.role, 'ADMIN');
        const student = await Student.findOne({ where: { UserId: req.params.id } })
        const deletedUser = await User.destroy({
            where: {
                [Op.and]: [{ id: req.params.id }, { role: 'student' }]
            },
        })
        await fs.unlink(student.photo_path, err => {
            if (err) throw err;
        })
        res.status(200).json({ deletedUser, msg: 'Student has been deleted succesfully', success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
}

module.exports = {
    create,
    findOne,
    updateStudent,
    findStudents,
    deleteStudent
}