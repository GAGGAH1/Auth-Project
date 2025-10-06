const express = require('express');

const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');

const { validateRegistration, validateLogin } = require('../helpers/validator');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', validateRegistration, registerUser);
router.post('/login', validateLogin, loginUser)

router.get('/profile', verifyToken, getUserProfile);


module.exports = router;