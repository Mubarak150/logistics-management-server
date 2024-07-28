const TransportContract = require('../models/TransportContract');
const { handleCreate, handleReadAll, handleReadById, handleUpdateById, handleDeleteById } = require('../utils/functions');

exports.createTransportContract = async (req, res) => {
  try {
    const transportContract = await handleCreate(TransportContract)(req, res);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Duplicate value error: This name already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

exports.getAllTransportContracts = handleReadAll(TransportContract);
exports.getTransportContractById = handleReadById(TransportContract);
exports.updateTransportContractById = async (req, res) => {
  try {
    const transportContract = await handleUpdateById(TransportContract)(req, res);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Duplicate value error: This name already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};
exports.deleteTransportContractById = handleDeleteById(TransportContract);
