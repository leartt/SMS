const jwt = require('jsonwebtoken');
const transporter = require('../utils/nodemailer');

const confirmEmail = async (user) => {
    const payload = {
        id: user.id
    }
    const key = 'EmailSecret_'

    jwt.sign(payload, key, {
        expiresIn: "24h"
    }, (err, emailToken) => {
        if (err) {
            throw err;
        }
        const url = `http://localhost:${process.env.PORT || 5000}/user/confirmation/${emailToken}`;

        transporter.sendMail({
            from: '"School Management System" <team@schoolmanagementsystem.com>', // sender address
            to: user.email, // list of receivers
            subject: "Confirm email", // Subject line
            html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`, // html body
        }, (error, info) => {
            if (error) {
                throw error
            }
            else {
                console.log("Message sent: %s", info.messageId);
            }
        });
    })
}

module.exports = confirmEmail;