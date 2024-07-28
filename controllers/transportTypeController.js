const Transports = require('../models/TransportType');
const { handleCreate, handleReadAll, handleReadById, handleUpdateById, handleDeleteById } = require('../utils/functions');

exports.createTransport = handleCreate(Transports);
exports.getAllTransports = handleReadAll(Transports);
exports.getTransportById = handleReadById(Transports);
exports.updateTransportById = handleUpdateById(Transports);
exports.deleteTransportById = handleDeleteById(Transports);
