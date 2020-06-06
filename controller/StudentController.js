const User = require('../models').User
const Student = require('../models').Student
const Parent = require('../models').Parent

const bcrypt = require('bcryptjs');

const upload = require('../uploader');

create = [upload.single('photo_path'), async (req, res) => {
    try {
        let { email, password, role, name, surname, address, phone, birthday, parentId } = req.body;
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
        let { name, surname, address, phone, birthday, parentId } = req.body;

        const updatedStudent = await Student.update({
            name,
            surname,
            address,
            phone,
            birthday,
            parentId,
            include: [
                { model: User }
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
                { model: User }
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
                    model: User
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
        const deletedStudent = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ deletedStudent, msg: 'Student has been deleted succesfully', success: true });
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