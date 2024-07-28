const Currency = require('../models/Currency');
const { handleCreate, handleReadAll, handleReadById, handleUpdateById, handleDeleteById } = require('../utils/functions');

exports.createCurrency = handleCreate(Currency);
exports.getAllCurrencies = handleReadAll(Currency);
exports.getCurrencyById = handleReadById(Currency);
exports.updateCurrencyById = handleUpdateById(Currency);
exports.deleteCurrencyById = handleDeleteById(Currency);
