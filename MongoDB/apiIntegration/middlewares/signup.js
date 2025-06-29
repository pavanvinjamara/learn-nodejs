// import the model 

const User = require('../models/User');


// Validate input fields
const validateSignup = (req, res, next ) => {
   const { name, email, password, phone } = req.body;

   if( !name || !email || !password || !phone ){
        return res.status(400).json({ error: "All fields are required"});
   }
    // regex also we can use
   if(password.length < 6 ){
        return res.status(400).json({ error : "Password must be at least 6 characters"});
   }

   if(phone.length !== 10){
        return res.status(400).json({ error : "Phone number must be 10 digits"})
   }

   next();
}

//  Check if email is already registered
const checkExistingUser = async ( req, res, next ) => {

    try{
        const { email } = req.body;
        const exitingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(409).json({ error: "Email already registered"});
        }

        next();

    }catch(err){
        res.status(500).json({ error: err.msg})
    }

};

module.exports = { validateSignup, checkExistingUser };