const Parent = require('../models').Parent;
const User = require('../models').User;
const Student = require('../models').Student;

const checkPermission = require('../permission');

const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const key = process.env.secret
const { Op } = require('sequelize');
const upload = require('../uploader');


exports.create = [upload.single('photo_path'), async (req, res) => {
    try {
        checkPermission(req.user.role, 'ADMIN');
        const emailExist = await User.findOne({ where: { email: req.body.email } });
        if (emailExist) {
            return res.status(400).json({ msg: 'This email already exists', success: false })
        }
        let { email, password, role, name, surname, address, phone, birthday } = req.body;

        const user = {
            email,
            password,
            role
        };
        const parent = {
            name,
            surname,
            address,
            phone,
            birthday,
            photo_path: req.file.path
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                if (err) { console.log(err); throw (err) }
                try {
                    user.password = hash;
                    const registeredUser = await User.create(user)

                    const registeredParent = await registeredUser.createParent(parent)
                    return res.status(200).json({
                        success: true,
                        registeredParent: [registeredUser, registeredParent],
                        msg: "Parent is now registered"
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

exports.updateParent = async (req, res) => {
    try {
        checkPermission(req.user.role, 'ADMIN');
        let { name, surname, address, phone, birthday } = req.body;

        const updatedParent = await Parent.update({
            name,
            surname,
            address,
            phone,
            birthday,
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

        res.status(200).json({ updatedParent, msg: 'Parent has been updated succesfully', success: true })
    }
    catch (err) {
        res.status(400).json({ err })
    }
}

exports.findOne = async (req, res) => {
    try {
        const parent = await Parent.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                }
            ]
        });
        res.status(200).json({ parent, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}


exports.findParents = async (req, res) => {
    try {
        const parents = await Parent.findAll({
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                },
                {
                    model: Student
                }
            ]
        });
        res.status(200).json({ parents, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}

exports.delete = async (req, res) => {
    try {
        checkPermission(req.user.role, 'ADMIN');
        const parent = await Parent.findOne({ where: { UserId: req.params.id } })
        const deletedUser = await User.destroy({
            where: {
                [Op.and]: [{ id: req.params.id }, { role: 'parent' }]
            },
        });
        await fs.unlink(parent.photo_path, err => {
            if (err) throw err;
        })
        res.status(200).json({ deletedUser, msg: 'Parent has been deleted succesfully', success: true });
    }

    catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
}

