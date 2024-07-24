const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createOne = async (Model, data) => {
    try {
        const doc = new Model(data);
        await doc.save();
        return doc;
    } catch (error) {
        throw new Error(error.message);
    }
};

const readAll = async (Model, query = {}) => {
    try {
        const docs = await Model.find(query);
        return docs;
    } catch (error) {
        throw new Error(error.message);
    }
};

const readById = async (Model, id) => {
    try {
        const doc = await Model.findById(id);
        if (!doc) throw new Error('Document not found');
        return doc;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateById = async (Model, id, data) => {
    try {
        const doc = await Model.findByIdAndUpdate(id, data, { new: true });
        if (!doc) throw new Error('Document not found');
        return doc;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteById = async (Model, id) => {
    try {
        const doc = await Model.findByIdAndDelete(id);
        if (!doc) throw new Error('Document not found');
        return doc;
    } catch (error) {
        throw new Error(error.message);
    }
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports = {
    createOne,
    readAll,
    readById,
    updateById,
    deleteById,
    hashPassword,
};
