const userModel = require('../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        // Validation using express-validator
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ 
            success: false,
            message: 'Validation errors',
            errors: errors.array() 
         });
       }

       const { name , email, password} = req.body;

       //Check if user already exists
       const existingUser = await userModel.findOne({ email });
        if(existingUser) return res.status(409).json({
            success: false,
            message: 'User already exists',
        });
         // Proceed to create user
       const hashedPassword = await bcrypt.hash(password, 10);
       const user = new userModel({
        name,
        email,
        password: hashedPassword
       });
        const userData = await user.save();

        res.status(201).json({ 
            success: true,
            message: 'User registered successfully',
            data: userData
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Registration failed",
            error: error.message 
        });
    }
}

const generateAccessToken = async (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2h' });
}

const loginUser = async ( req, res ) => {
    try {
         // Validation using express-validator
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ 
            success: false,
            message: 'Validation errors',
            errors: errors.array() 
         });
       }

       const { email, password } = req.body;

       const userData = await userModel.findOne({ email });
       if(!userData) return res.status(404).json({
            success: false,
            message: 'Invalid Credentials( User not Found)',
       });

      const isPasswordTheSame = await bcrypt.compare(password, userData.password);
      if(!isPasswordTheSame) return res.status(401).json({
        success: false,
        message: 'Password not Matching'
      })


        const token = await generateAccessToken({ user: userData });

      res.status(200).json({ 
            success: true,
            message: 'Login successfully',
            token: token,
            tokenType: "Bearer",
            data: userData
        });

    } catch (error) {
         res.status(500).json({ 
            success: false,
            message: "Login failed",
            error: error.message 
        });
    }
}

const getUserProfile = async (req, res ) => {
  try {
    // const { user } = req;
    // const user_id = req.user._id;
    const { _id: user_id } = req.user;
    const userData = await userModel.findOne({_id: user_id});
    if(!userData) return res.status(404).json({
        success: false,
        message: 'User not found',
    });

    

    res.status(200).json({ 
        success: true,
        message: 'User profile fetched successfully',
        data: userData
    });
  } catch (error) {
      res.status(500).json({ 
        success: false,
        message: "Fetching profile failed",
        error: error.message 
    });
  }
}

module.exports = { registerUser, loginUser, getUserProfile };