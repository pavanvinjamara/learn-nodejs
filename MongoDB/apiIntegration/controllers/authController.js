//  Use camelCase or kebab-case for file names: userController.js or user-controller.js.
//  These are plain JavaScript files with functions, not classes.
//  To save user data model in database we use this controller which handle logic and recieve and sending response

// Import User schema from models so create a object use User constructor
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Utils
const sendTokenResponse = (user, res, message = "Success") => {
    const token = generateToken(user);

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: process.env.COOKIE_EXIPRE  * 24 * 60 * 60 * 1000
    });

    res.status( res.statusCode || 200).json({
        user,
        msg: message,
    });
}

// Signup Controller
const signup = async (req, res) => {
    try{
          // create a user object using req.body and User constructor
        const user = new User(req.body);

        // save method is used to save data in database
        await user.save();

        sendTokenResponse(user, res, "Account created successfully");
    }
    catch( err ){
        if(err.code === 11000)
            return res.status(400).json({ error: "Email or phone already exists"})
        res.status(500).json({ error: err.message }) // sending error msg to client
    }
};

//Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if( !user || !( await user.matchPassword( password ))){
        return res.status(401).json({ msg: 'Invalid credentials' });
    }

    sendTokenResponse(user, res, "Logged in successfully");
};





module.exports = { signup , login };

// To use this controller and send request to the server we need routes --> userRoutes.js

