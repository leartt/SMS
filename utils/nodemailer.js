const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.mailTrapUser,
        pass: process.env.mailTrapPassword
    }
});

module.exports = transporter;