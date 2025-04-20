// Import the Express framework to create a server
const express = require("express");

// Import dotenv to load environment variables from a .env file
const dotEnv = require("dotenv");

// Import MongoClient from the mongodb package to connect to MongoDB
const { MongoClient } = require('mongodb');

// Create an instance of Express
const app = express();

// Define the port the server will run on
const PORT = 3000;

// Load environment variables from a .env file into process.env
dotEnv.config();

// Connect to MongoDB using the URL stored in the environment variable MONGO_URL
MongoClient.connect(process.env.MONGO_URL)
  .then(() => {
    // If connection is successful, log a success message
    console.log("MongoDB connected Successfully");
  })
  .catch((err) => {
    // If connection fails, log the error
    console.log("Error", err); 
  });

// Start the Express server on the specified port
app.listen(PORT, () => {
  console.log(`Server started and running at ${PORT}`);
});
