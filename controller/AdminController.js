const Admin = require('../models').Admin;
const User = require('../models').User;

const checkPermission = require('../permission');
const fs = require('fs');

const sendConfirmEmail = require('../utils/emailConfirmation');
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

        let { email, password, role, name, surname, address, phone, birthday } = req.body;

        const user = {
            email,
            password,
            role
        };
        const admin = {
            name,
            surname,
            address,
            phone,
            birthday,
            photo_path: req.file.path
        }



        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;

        const registeredUser = await User.create(user);
        const registeredAdmin = await registeredUser.createAdmin(admin);

        sendConfirmEmail(registeredUser)

        return res.status(200).json({
            success: true,
            registeredAdmin: [registeredUser, registeredAdmin],
            msg: "Admin is now registered"
        });

    }
    catch (err) {
        res.status(400).json({ msg: err, success: false });
    }
}];

exports.updateAdmin = async (req, res) => {
    try {
        checkPermission(req.user.role, 'ADMIN');
        let { name, surname, address, phone, birthday } = req.body;

        const updatedAdmin = await Admin.update({
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

        res.status(200).json({ updatedAdmin, msg: 'Admin has been updated succesfully', success: true })
    }
    catch (err) {
        res.status(400).json({ err })
    }
}


exports.findOne = async (req, res) => {
    try {
        checkPermission(req.user.role, 'ADMIN');
        const admin = await Admin.findOne({
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
        res.status(200).json({ admin, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}


exports.findAdmins = async (req, res) => {
    try {
        checkPermission(req.user.role, 'ADMIN');
        const admins = await Admin.findAll({
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                },
            ]
        });
        res.status(200).json({ admins, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}

exports.delete = async (req, res) => {
    try {
        checkPermission(req.user.role, 'ADMIN');
        const admin = await Admin.findOne({ where: { UserId: req.params.id } })
        const deletedUser = await User.destroy({
            where: {
                [Op.and]: [{ id: req.params.id }, { role: 'admin' }]
            },
        });
        await fs.unlink(admin.photo_path, err => {
            if (err) throw err;
        })
        res.status(200).json({ deletedUser, msg: 'Admin has been deleted succesfully', success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
}

