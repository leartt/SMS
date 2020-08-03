const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const Student = require('../models').Student;
const Parent = require('../models').Parent;
const Teacher = require('../models').Teacher;
const Admin = require('../models').Admin;
const User = require('../models').User;
const Feedback = require('../models').Feedback;
const Classroom = require('../models').Classroom;

const jwt = require('jsonwebtoken');
const passport = require('passport');


router.post('/login', UserController.login)

router.get('/confirmation/:emailToken', async (req, res) => {
    try {
        const payload = jwt.verify(req.params.emailToken, 'EmailSecret_');
        await User.update({ confirmedEmail: true }, { where: { id: payload.id } });
        return res.status(200).json({ msg: 'You have confirmed your email' })
    } catch (err) {
        res.status(400).json({ err });
    }
});

router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        console.log(req.body.user);
        let user;
        switch (req.user.role.toLowerCase()) {
            case 'admin':
                user = await Admin.findOne({
                    where: { userId: req.user.id },
                    include: [{ model: User, attributes: { exclude: ['password'] } }]
                });
                res.json({ user, success: true });
                break;
            case 'parent':
                user = await Parent.findOne({
                    where: { userId: req.user.id },
                    include: [
                        { model: User, attributes: { exclude: ['password'] } },
                        { model: Student },
                        { model: Feedback }
                    ]
                });
                res.json({ user, success: true })
                break;
            case 'student':
                user = await Student.findOne({
                    where: { userId: req.user.id },
                    include: [
                        { model: User, attributes: { exclude: ['password'] } },
                        { model: Classroom }]
                });
                res.json({ user, success: true })
                break;
            case 'teacher':
                user = await Teacher.findOne({
                    where: { userId: req.user.id },
                    include: [
                        { model: User, attributes: { exclude: ['password'] } },
                        { model: Classroom },
                    ]
                });
                res.json({ user, success: true });
                break;

            default:
                return res.json({ msg: 'No user with specific role found' })
        }
    } catch (err) {
        res.json({ err, success: false })
    }
})


module.exports = router;