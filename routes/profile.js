const express = require('express');
const { getProfiles, updateProfile, deleteProfile } = require('../controllers/profileController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getProfiles);
router.put('/:id', auth, updateProfile);
router.delete('/:id', auth, deleteProfile);

module.exports = router;
