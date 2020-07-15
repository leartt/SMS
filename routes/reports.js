const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

router.get('/', async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json({ reports })
    }
    catch (err) {
        res.status(400).json({err});
    }

})


module.exports = router;