const Parent = require('../models').Parent;
const User = require('../models').User;
const Student = require('../models').Student;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config()
const key = process.env.secret

const upload = require('../uploader');


exports.create = [upload.single('photo_path'), async (req, res) => {
    try {
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
        let { name, surname, address, phone, birthday } = req.body;

        const updatedParent = await Parent.update({
            name,
            surname,
            address,
            phone,
            birthday,
            include: [
                { model: User }
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
                { model: User }
            ]
        });
        res.status(200).json({ parent, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}

exports.login = async (req, res) => {
    let parent = await Parent.findOne({ where: { email: req.body.email } })
    if (!parent) {
        return res.status(404).json({
            msg: "Parent not found",
            success: false
        });
    }

    //Nese ekziston user atehere i krahasojme passwords
    bcrypt.compare(req.body.password, parent.password).then(isMatch => {
        if (isMatch) {
            //User password eshte korrekt dhe dergojme JSON Token per ate user
            const payload = {
                id: parent.id,
                username: parent.username,
                name: parent.name,
                email: parent.email
            }
            jwt.sign(payload, key, {
                expiresIn: 604800
            }, (err, token) => {
                res.status(200).json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: parent,
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

exports.findParents = async (req, res) => {
    try {
        const parents = await Parent.findAll({
            include: [
                {
                    model: User,
                },
                {
                    model: Student
                }
            ]
        });
        res.status(200).json({ parents, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false})
    }
}

exports.delete = async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json({ deletedUser, msg: 'Parent has been deleted succesfully', success: true });
    }

    catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
}

