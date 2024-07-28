const express = require('express');
const { signIn, registerAdmin, logout } = require('../controllers/authController');
const {isAlreadyAuthenticated, isAuthenticated} = require('../middleware/auth');
const router = express.Router();

// for dev: all the three are defined in authController... 
router.post('/sign-in', isAlreadyAuthenticated, signIn);
router.post('/register', isAuthenticated, registerAdmin);
router.post('/logout', logout); // log out

module.exports = router;
