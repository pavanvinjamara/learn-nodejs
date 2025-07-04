const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authController');
const { validateSignup, checkExistingUser } = require('../middlewares/signup');

// 
// Signup route 
router.post( '/signup', validateSignup, checkExistingUser, signup );




module.exports = router;