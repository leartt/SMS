const express = require('express');
const router = express.Router();
const ExamController = require('../controller/ExamController');


router.post('/', ExamController.create)

router.get('/', ExamController.findExams)

router.get('/:id', ExamController.findOne)

router.delete('/:id', ExamController.delete)


module.exports = router;