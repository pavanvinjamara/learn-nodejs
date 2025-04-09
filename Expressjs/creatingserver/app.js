// =======================> Before staring this refer doc.txt
// Creating Web Server

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

// To check the response go to browser use localhost:portnumber which is 3000 and route path in url it shows the response (!! http://localhost:3000/intro) 