const express = require('express');
const dotEnv =  require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000

dotEnv.config();
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB connected successfully")
})
.catch((err)=>{
    console.log(err)
})

// Routes
app.use('/api', require('./routes/index'));
 
app.listen(PORT, ()=>{
    console.log(`server started @ ${PORT}`);
});

// After