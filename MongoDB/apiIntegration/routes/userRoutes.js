const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController');
const { validateSignup, checkExistingUser } = require('../middlewares/signup');

// 
// Signup route 
router.post( '/signup', validateSignup, checkExistingUser, createUser );


module.exports = router;