const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
    region: { type: String, enum: ['Karachi', 'Islamabad', 'Lahore', 'all'], default: 'all' },
    isActive: { type: Boolean, default: true },
    profilePicture: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
