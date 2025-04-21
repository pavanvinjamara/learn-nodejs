const express = require('express');
const dotEnv =  require('dotenv');
const mongoose = require('mongooose');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`server started @ ${PORT}`);
})
