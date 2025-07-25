// import the model 
const User = require('../models/User');
const jwt =  require('jsonwebtoken');


// Validate signup input fields
const validateSignup = (req, res, next ) => {

    const { name, email, password, phone } = req.body;

    if( !name || !email || !password || !phone ){
        return res.status(400).json({ error: "All fields are required" });
    }
        // regex also we can use
    if(password.length < 6 ){
        return res.status(400).json({ error : "Password must be at least 6 characters" });
    }

    if(phone.length !== 10){
        return res.status(400).json({ error : "Phone number must be 10 digits" });
    }

    next();

}

//  Check if email is already registered
const checkExistingUser = async ( req, res, next ) => {

    try{

        const { email } = req.body;
        const exitingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(409).json({ error: "Email already registered" });
        }

        next();

    }catch(err){

        res.status(500).json({ error: err.msg });

    }

};

// Middleware to protect routes ( requires login )
const protect = async ( req, res, next ) => {
    
    const token = req.cookies.token;
    if(!token) return res.status(401).json({ msg : 'Not authorized, no token' });

    try{

        const decoded = jwt.verify( token, process.env.JWT_SCERET );
        req.user = await User.findById( decoded.id ).select('-password');
        if(!req.user)
            return res.status(401).json( {msg: 'User not found'});
        next();

    }
    catch (err) {

        res.status(401).json({ msg : 'Token invalid or expired'});

    }
}

// Middleware for role-based access
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({ msg : "Access denied : insufficient permission"})
        }
        next(); //Proceed if the role is authorized
    }
}

module.exports = { validateSignup, checkExistingUser, protect, authorizeRoles };