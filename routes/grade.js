const express = require('express');
const router = express.Router();
const GradeController = require('../controller/GradeController');


router.post('/', GradeController.create)

router.post('/transcript', GradeController.generateTranscript)

router.get('/', GradeController.findGrades)

router.get('/:id', GradeController.findOne)

router.delete('/:id', GradeController.delete)

module.exports = router;