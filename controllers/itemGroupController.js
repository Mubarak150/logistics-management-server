const ItemGroup = require('../models/ItemGroup');
const { handleCreate, handleReadAll, handleReadById, handleUpdateById, handleDeleteById } = require('../utils/functions');

exports.createItemGroup = handleCreate(ItemGroup);
exports.getAllItemGroups = handleReadAll(ItemGroup);
exports.getItemGroupById = handleReadById(ItemGroup);
exports.updateItemGroupById = handleUpdateById(ItemGroup);
exports.deleteItemGroupById = handleDeleteById(ItemGroup);
