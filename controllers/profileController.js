const User = require('../models/User');
const { readAll, readById, updateById, deleteById } = require('../utils/functions');

exports.getProfiles = async (req, res) => {
    try {
        const profiles = await readAll(User);
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email, role, region, isActive } = req.body;

    try {
        const updatedProfile = await updateById(User, id, {
            name,
            email,
            role,
            region,
            isActive,
        });
        res.json(updatedProfile);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.deleteProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await readById(User, id);
        if (user.role === 'superadmin') return res.status(400).json({ msg: 'Cannot delete superadmin' });

        await deleteById(User, id);
        res.json({ msg: 'Admin deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
