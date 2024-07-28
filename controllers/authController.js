const multer = require('multer');
const rateLimit = require('express-rate-limit');
const path = require('path');

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createOne, hashPassword } = require('../utils/functions');

// Rate limiter to prevent brute-force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // Limit each IP to 15 requests per windowMs
    message: 'Too many login attempts, please try again later',
});

exports.signIn = [
    limiter, // Apply rate limiter middleware

    async (req, res) => {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ msg: 'Invalid email format' });
        }

        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ msg: 'user not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

            if (!user.isActive) return res.status(403).json({ msg: 'Access denied' });

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            // Set secure cookie
            res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000, sameSite: 'Strict' }); // Cookie expires in 1 hour

            res.json({ msg: 'Logged in successfully' });
            res.redirect('/'); 
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Server error' });
        }
    }
]; // comment: i designed this sign in system first it requires both email and password, in step 2 it looks for email in db, if found it checks the password, then it logs in the user.. above all that i have limited the number of sign ins per day to 15 and sessions expire in one hour

// Helper function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

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
        // Ensure the user is a superadmin
    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ msg: 'Access denied. Only superadmins can add new registrations.' });
    }
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

