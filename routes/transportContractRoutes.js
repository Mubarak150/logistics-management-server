const express = require('express');
const router = express.Router();
const transportContractController = require('../controllers/transportContractController');

router.post('/', transportContractController.createTransportContract);
router.get('/', transportContractController.getAllTransportContracts);
router.get('/:id', transportContractController.getTransportContractById);
router.put('/:id', transportContractController.updateTransportContractById);
router.delete('/:id', transportContractController.deleteTransportContractById);

module.exports = router;
