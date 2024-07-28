const express = require('express');
const router = express.Router();
const {
  createItemGroup,
  getAllItemGroups,
  getItemGroupById,
  updateItemGroupById,
  deleteItemGroupById,
} = require('../controllers/itemGroupController');

router.post('/', createItemGroup);
router.get('/', getAllItemGroups);
router.get('/:id', getItemGroupById);
router.put('/:id', updateItemGroupById);
router.delete('/:id', deleteItemGroupById);

module.exports = router;
