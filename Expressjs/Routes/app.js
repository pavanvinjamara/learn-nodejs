// Routes

// In Express.js, a route defines how an application responds to a client request to a particular endpoint, which is a combination of a path and an HTTP method (like GET, POST, PUT, DELETE).

// Basic Route Syntax
//     app.METHOD(PATH, HANDLER)

// ==>app: The instance of Express.

// ==>METHOD: The HTTP method (GET, POST, etc.).

// ==>PATH: The endpoint (e.g., "/users").

// ==>HANDLER: The function that executes when the route is matched.

// import the express js which is already installed using require method and param ==> string (express)
const express = require('express');

// create a variable app in that call the express method as shown in below 
// By using this we can access al method of express
const app = express();

// Create  a port variable to store the port number of server
const port =  3000;

// To start the server we use method listen using app 
// In this method it takes 2 arguments
// 1-arg is port number , 2-arg is a callback functon which we can so some output, when server runs
app.listen(port,()=>{
    // to show output when server starts running
    console.log(`server starts @${port}`);
})

// use the command npm start in terminal (* check the folder path)
// To stop the terminal use (Ctrl + c)


// Basic Example
// To apply route we use method like get, post ,put & delete  to create routes like below
app.get('/',(req, res)=>{
    res.send("This is Login Page");
})

// Open browser and check localhost:3000 you can see the respopnse message in browser

// Method	        Purpose

// GET	            Read or retrieve data
// POST	            Create new data
// PUT	            Update existing data
// DELETE	        Delete data


// 1. GET Route     
//     Def: Retrieves data for the server
//     Use: show a list of user, fetch a single product, etc

// Sample Code  (****** Refer the Basic syntax at top of the page)
app.get('/users', (req, res)=>{
    res.send('User list');
})

// 2. POST Route
//     Def: Submits new data to the server.
//     Use: Add a new user, submit the form, etc.

// Sample Code  (****** Refer the Basic syntax at top of the page)
app.post('/users',(req, res) => {
    res.send(`User created`)
})

// 3. PUT Route
//      Def: Updates existing data.
//      Use:  Update a user's info, modify a post, etc.

// Sample Code  (****** Refer the Basic syntax at top of the page)
app.put('/users/:id', (req, res)=> {
    res.send(`User ${req.params.id} updated`)
})

// 4. DELETE Route
//      Def: Delete data.
//      Use:  Remove a user, Delete a product, etc.

// Sample Code  (****** Refer the Basic syntax at top of the page)
app.delete('/users/:id', (req, res)=>{
    res.send(`User ${req.params.id} deleted`);
});

// 5. Route Parameters
//      Def: Dynamic parts of a route (e.g. : id, :username).
//      Use: Get user by ID, product by slug, etc

// Sample Code  (****** Refer the Basic syntax at top of the page)
app.get('/product/:id', (req, res) => {
    res.send(`Product ID: ${req.params.id}`);
});

// 6. Query Parameters
//      Def: Passed in URL after ?, used for filters, serach, etc.
//      Use: /search?q=laptop&page=2

// Sample Code  (****** Refer the Basic syntax at top of the page)
app.get('/search', (req, res) => {
    res.send(`Search: ${req.query.q}, Page: ${req.query.page}`);
});

// Remaining types we see after middleware 
// 7.Middleware in Route
// 8. Express Router (Modular Routes)
// 9. Wildcard Route (404 Not Found)
// 10. Multiple Handlers for One Route
// 11. All Methods for a Path (app.route)
