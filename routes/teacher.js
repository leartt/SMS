const express = require('express');
const router = express.Router();
const TeacherController = require('../controller/TeacherController');


router.post('/', TeacherController.create)

router.get('/', TeacherController.findTeachers)

router.get('/:id', TeacherController.findOne)

router.put('/:id', TeacherController.updateTeacher)

router.delete('/:id', TeacherController.delete)



module.exports = router;