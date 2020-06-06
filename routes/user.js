const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const Student = require('../models').Student;
const Parent = require('../models').Parent;

const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', UserController.login)

router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let user;
        switch (req.user.role.toLowerCase()) {
            case 'admin':
                break;
            case 'parent':
                user = await Parent.findOne({ where: { userId: req.user.id } })
                res.json({ user, success: true });
                break;
            case 'student':
                user = await Student.findOne({ where: { userId: req.user.id } })
                res.json({ user, success: true })
                break;
            case 'teacher':
                user = await Teacher.findOne({ where: { userId: req.user.id } })
                res.json({ user, success: true });
                break;
              
            default:
                return res.json({ msg: 'No user with specific role found' })
        }
    }catch(err) {
        res.json({err, success: false})
    }
})


module.exports = router;