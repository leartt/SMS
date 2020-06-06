const Teacher = require('../models').Teacher;
const User = require('../models').User;


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('dotenv').config()
const key = process.env.secret

const upload = require('../uploader');


exports.create = [upload.single('photo_path'), async (req, res) => {
    try {
        let { email, password, role, name, surname, address, phone, birthday, salary } = req.body;

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
            salary
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                if (err) { console.log(err); throw (err) }
                try {
                    user.password = hash;
                    const registeredUser = await User.create(user)

                    const registeredTeacher = await registeredUser.createTeacher(teacher)
                    return res.status(200).json({
                        success: true,
                        registeredTeacher: [registeredUser, registeredTeacher],
                        msg: "Teacher is now registered"
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
}];

exports.updateTeacher = async (req, res) => {
    try {
        let { name, surname, address, phone, birthday, salary } = req.body;

        const updatedTeacher = await Teacher.update({
            name,
            surname,
            address,
            phone,
            birthday,
            salary,
            include: [
                { model: User }
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
                { model: User }
            ]
        });
        res.status(200).json({ teacher, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}

exports.login = async (req, res) => {
    let teacher = await Teacher.findOne({ where: { email: req.body.email } })
    if (!teacher) {
        return res.status(404).json({
            msg: "Teacher not found",
            success: false
        });
    }

    //Nese ekziston user atehere i krahasojme passwords
    bcrypt.compare(req.body.password, teacher.password).then(isMatch => {
        if (isMatch) {
            //User password eshte korrekt dhe dergojme JSON Token per ate user
            const payload = {
                id: teacher.id,
                email: teacher.email,
                role: teacher.role,
            }
            jwt.sign(payload, key, {
                expiresIn: 604800
            }, (err, token) => {
                res.status(200).json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: teacher,
                    msg: "You're now logged in"
                });
            })
        }
        else {
            return res.status(404).json({
                msg: "Incorrect password",
                success: false
            })
        }
    })
}

exports.findTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({
            include: [
                {
                    model: User,
                },
                
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
        const deletedUser = await User.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json({ deletedUser, msg: 'Teacher has been deleted succesfully', success: true });
    }

    catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
}

