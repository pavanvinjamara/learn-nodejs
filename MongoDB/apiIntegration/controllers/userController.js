//  Use camelCase or kebab-case for file names: userController.js or user-controller.js.
//  These are plain JavaScript files with functions, not classes.

const createUser = async (req, res) => {
    try{
        const { name, email, password, phone } = req.body;

        

        const hashedPassword = await bcrypt.hash( password, 10);

        const user = new User({
            ...req.body,
            password: hashedPassword,
        })

        await user.save();
        res.status(201).json(user);
    }
    catch( err ){
        res.status(500).json({ error: error.message })
    }
}

module.exports = { createUser };