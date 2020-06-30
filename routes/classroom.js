const express = require('express');
const router = express.Router();
const ClassroomController = require('../controller/ClassroomController');


router.post('/', ClassroomController.create)

router.get('/', ClassroomController.findClassrooms)

router.get('/:id', ClassroomController.findOne)

router.delete('/:id', ClassroomController.delete)



module.exports = router;