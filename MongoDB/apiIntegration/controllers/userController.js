//  Use camelCase or kebab-case for file names: userController.js or user-controller.js.
//  These are plain JavaScript files with functions, not classes.
//  To save user data model in database we use this controller which handle logic and recieve and sending response

// Import User schema from models so create a object use User constructor
const User = require('../models/User');

const createUser = async (req, res) => {
    try{

        const { name, email, password, phone } = req.body;

        // logic part 
        // Here we are encrypt the password to protect
        const hashedPassword = await bcrypt.hash( password, 10); // default 10

        // create a user object using req.body and User constructor
        const user = new User({
            ...req.body,
            password: hashedPassword,
        })

        // save method is used to save data in database
        await user.save();
        res.status(201).json(user); // sending success status to client
    }
    catch( err ){
        res.status(500).json({ error: error.message }) // sending error msg to client
    }
};


module.exports = { createUser };

// To use this controller and send request to the server we need routes --> userRoutes.js

