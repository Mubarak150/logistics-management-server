const Country = require('../models/Country');
const { handleCreate, handleReadAll, handleReadById, handleUpdateById, handleDeleteById } = require('../utils/functions');

exports.createCountry = handleCreate(Country);
exports.getAllCountries = handleReadAll(Country);
exports.getCountryById = handleReadById(Country);
exports.updateCountryById = handleUpdateById(Country);
exports.deleteCountryById = handleDeleteById(Country);
