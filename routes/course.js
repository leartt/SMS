const express = require('express');
const router = express.Router();
const CourseController = require('../controller/CourseController');


router.post('/', CourseController.create)

router.get('/', CourseController.findCourses)

router.get('/:id', CourseController.findOne)

router.delete('/:id', CourseController.delete)


module.exports = router;