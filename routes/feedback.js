const express = require('express');
const router = express.Router();
const FeedbackController = require('../controller/FeedbackController');


router.post('/', FeedbackController.create)

router.post('/report', FeedbackController.generateReport)

router.get('/', FeedbackController.findFeedbacks)

router.get('/:id', FeedbackController.findOne)

router.delete('/:id', FeedbackController.delete)


module.exports = router;