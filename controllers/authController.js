const multer = require('multer');
const path = require('path');

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createOne, hashPassword } = require('../utils/functions');

exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        if (!user.isActive) return res.status(403).json({ msg: 'Access denied' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Set token in cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Cookie expires in 1 hour
        res.json({ msg: 'Logged in successfully' });
        
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Configuring multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory in which to keep uploaded files i.e. uploads in root dir. 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});

const upload = multer({ storage: storage });


exports.registerAdmin = [
    upload.single('image'), // Handle single file upload with field name 'image'
    async (req, res) => {
        const { name, email, password, role, region } = req.body;
        
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                role,
                region,
                isActive: true,
                image: req.file ? req.file.filename : null // Save image filename to the database
            });

            await newUser.save();
            res.status(201).json({ msg: 'Admin registered successfully' });
        } catch (error) {
            res.status(500).json({ msg: 'Server error', error: error.message });
        }
    }
];

exports.logout = (req, res) => {
    res.clearCookie('token'); // Assuming you're using cookies to store the JWT
    res.json({ msg: 'Successfully logged out' });
};

