const express = require('express');
const router = express.Router();
const ParentController = require('../controller/ParentController');


router.post('/', ParentController.create)

router.get('/', ParentController.findParents)

router.get('/:id', ParentController.findOne)

router.put('/:id', ParentController.updateParent)

router.delete('/:id', ParentController.delete)



module.exports = router;