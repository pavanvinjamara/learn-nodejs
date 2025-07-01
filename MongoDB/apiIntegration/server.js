const express = require('express');
const dotEnv =  require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotEnv.config();
const app = express();

const PORT = process.env.PORT || 3000

// It is a built-in middleware, Parses incoming JSON payloads from the request body
app.use(express.json());

// Use cookie-parser middleware
app.use(cookieParser());


// Routes
app.use('/api', require('./routes/index'));
 
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
});
// After