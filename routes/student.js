const express = require('express');
const router = express.Router();
const StudentController = require('../controller/StudentController');

router.post('/', StudentController.create)

router.get('/', StudentController.findStudents)

router.get('/:id', StudentController.findOne)

router.put('/:id', StudentController.updateStudent)

router.delete('/:id', StudentController.deleteStudent)

module.exports = router;