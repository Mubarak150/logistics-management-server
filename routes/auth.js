const express = require('express');
const { signIn, registerAdmin, logout } = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

// for dev: all the three are defined in authController... 
router.post('/sign-in', signIn);
router.post('/register', auth, registerAdmin);
router.post('/logout', logout); // log out

module.exports = router;
