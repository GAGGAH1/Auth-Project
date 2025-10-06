const { check } = require('express-validator');

// Validation rules for user registration
const validateRegistration = [
  check('name')
    .notEmpty().withMessage('Name is required') 
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  check('email')
    .isEmail().withMessage('Please provide a valid email address'),
  check('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Validation rules for user login
const validateLogin = [
  check('email')
    .isEmail().withMessage('Please provide a valid email address').normalizeEmail({ gmail_remove_dots: true }),
  check('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const createUserValidator = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
];

module.exports = {
  validateRegistration,
  validateLogin,
  createUserValidator
};