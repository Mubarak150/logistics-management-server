const express = require('express');
const { getProfiles, updateProfile, deleteProfile } = require('../controllers/profileController');
const { isAuthenticated }  = require('../middleware/auth');
const router = express.Router();

router.get('/', isAuthenticated, getProfiles);
router.put('/:id', isAuthenticated, updateProfile);
router.delete('/:id', isAuthenticated, deleteProfile);

module.exports = router;
