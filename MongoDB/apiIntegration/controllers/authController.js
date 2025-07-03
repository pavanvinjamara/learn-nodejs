//  Use camelCase or kebab-case for file names: userController.js or user-controller.js.
//  These are plain JavaScript files with functions, not classes.
//  To save user data model in database we use this controller which handle logic and recieve and sending response

// Import User schema from models so create a object use User constructor
const User = require('../models/User');
const generateToken = require('../utils/generateToken');


const signup = async (req, res) => {
    try{

        const { name, email, password, phone } = req.body;

        // create a user object using req.body and User constructor
        const user = new User({
            ...req.body,
            password: hashedPassword,
        })

        // save method is used to save data in database
        await user.save();

        const token = generateToken( user );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        }).status(201).json({
            user,
            msg: "Account created successfully",
        }); // sending success status to client
    }
    catch( err ){
        res.status(500).json({ error: error.message }) // sending error msg to client
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if( !user || !( await user.matchPassword( password ))){
        return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status( 200 ).json({
        user,
        msg: 'Logged Successfully',
        
    });
};


module.exports = { signup , login };

// To use this controller and send request to the server we need routes --> userRoutes.js

