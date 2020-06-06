const express = require('express');
const router = express.Router();
const AdminController = require('../controller/AdminController');


router.post('/', AdminController.create)

router.get('/', AdminController.findAdmins)

router.get('/:id', AdminController.findOne)

router.put('/:id', AdminController.updateAdmin)

router.delete('/:id', AdminController.delete)



module.exports = router;