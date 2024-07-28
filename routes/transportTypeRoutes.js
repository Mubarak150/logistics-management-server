const express = require('express');
const router = express.Router();
const {
  createTransport,
  getAllTransports,
  getTransportById,
  updateTransportById,
  deleteTransportById,
} = require('../controllers/transportTypeController');

router.post('/', createTransport);
router.get('/', getAllTransports);
router.get('/:id', getTransportById);
router.put('/:id', updateTransportById);
router.delete('/:id', deleteTransportById);

module.exports = router;
