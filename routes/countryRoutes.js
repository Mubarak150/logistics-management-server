const express = require('express');
const router = express.Router();
const {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountryById,
  deleteCountryById,
} = require('../controllers/countryController');

router.post('/', createCountry);
router.get('/', getAllCountries);
router.get('/:id', getCountryById);
router.put('/:id', updateCountryById);
router.delete('/:id', deleteCountryById);

module.exports = router;
