const express = require('express');
const router = express.Router();
const ExamResultController = require('../controller/ExamResultController');


router.post('/', ExamResultController.create)

router.get('/', ExamResultController.findExamsResult)

router.get('/:id', ExamResultController.findOne)

router.delete('/:id', ExamResultController.delete)


module.exports = router;