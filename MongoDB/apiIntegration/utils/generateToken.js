const jwt = require('jsonwebtoken');

const generateToken = ( user ) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SCERET_KEY, 
        { expiresIn: `${process.env.COOKIE_EXPIRE}d` }
    );
};

module.exports = generateToken;