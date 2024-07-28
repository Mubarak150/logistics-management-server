const express = require('express');
const router = express.Router();
const {
  createCurrency,
  getAllCurrencies,
  getCurrencyById,
  updateCurrencyById,
  deleteCurrencyById,
} = require('../controllers/currencyController');

router.post('/', createCurrency);
router.get('/', getAllCurrencies);
router.get('/:id', getCurrencyById);
router.put('/:id', updateCurrencyById);
router.delete('/:id', deleteCurrencyById);

module.exports = router;
