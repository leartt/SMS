const User = require('../models').User;
const Parent = require('../models').Parent;
const Student = require('../models').Student;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const key = process.env.secret;


exports.login = async (req, res) => {
    let user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
        return res.status(404).json({
            msg: "User not found",
            success: false
        });
    }

    //Nese ekziston user atehere i krahasojme passwords
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
            //User password eshte korrekt dhe dergojme JSON Token per ate user
            const payload = {
                id: user.id,
                email: user.email,
                role: user.role
            }
            jwt.sign(payload, key, {
                expiresIn: "24h"
            }, (err, token) => {
                res.status(200).json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: user,
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