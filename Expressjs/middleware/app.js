// =======================> Before staring this refer doc.txt

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


// To Show the response we create a route and we show the response 
// Now we use the get method, It takes two arguments 
// arg-1 route name, arg-2 callback function ehich has two parameter , 1-para request, 2-para response

app.get('/intro',(req, res)=>{
    // To show response we use method send as shown in below
    res.send("Hey, I am Vinjamara Pavan Kumar. Nice To Meet You"); 
})


// ************************* Middleware *************
// use Method
// The app.use() method in Node.js with Express is used to mount middleware functions at a specific path. Middleware functions are functions that have access to the req, res, and next objects in the request-response cycle.

// Basic Syntax:

// app.use([path], callback)
// path (optional): The base route where the middleware should be applied.

// callback: The middleware function or an array of functions.

// ✅ What middleware can do:
// Execute any code

// Modify the request (req) or response (res) objects

// End the request-response cycle

// Call the next() function to pass control to the next middleware


// 1. Global Middleware (applies to all routes):
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Passes control to the next middleware/route handler
});

// 2.Mounting at a Path
app.use('/api', (req, res, next)=>{
    console.log('API Middleware')
})
// 3. Using with Static Files:
// ****app.use(express.static('public'));
// Serves static files from the public directory.

// 4. Using Routers:
// const userRouter = require('./routes/users');
// *****app.use('/users', userRouter);


// Mounts the userRouter on the /users path.
//  9. Wildcard Route (404 Not Found)
//      Definition: Catches all undefined routes.
//      Use: Show a custom "Not Found" page.
//      Example:
app.use((req, res)=>{
    res.status(404).send('404- Page Not Found')
})



//  7. Middleware in Route
//  Definition: Functions that run before route handlers.
//  Use: Authentication, logging, validation, etc.
//  Example:
const logger = (req,res,next) =>{
    console.log("Loging Handler")
    next();// Passes control to the next middleware/route handler
};

app.get('/about', logger,(req, res) =>{
    res.send("About Page")
})

//  10. Multiple Handlers for One Route
//      Definition: Chain multiple middleware functions for one route.
//      Use: Clean up logic, authentication + data processing.

// Example

const authHandler = (req,res, next) =>{
    console.log("authication od user")
}

const logHandler= (req, res, next)=>{
    console.log('session handler')
}

app.get('/contact', authHandler,logHandler,(req,res)=>{
    res.send("Profile User")
})