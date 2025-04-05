// Client - Server Communication
// To make understand response and request between client and server is called HTTP 

// HTTP Module

// import the http module using require statement
const http = require('http');

// Now we are creating a server
// To create a server we use method createServer, which takes one argument which is a function below commented code
// step 1
http.createServer((request, response)=>{

})

// created server to communicate with sever we need a port 
// To do that we store createServer in a variable  show in below
// step 2
let myServer =http.createServer((request, response)=>{
    // ==> To send request open browser and open link localhost with port number and you can see the response there
    // to write in response we use write method
    response.write("welcome to nodejs");
    //  we need to end the response to do that we use end method
    response.end();
});

// Creating Port
// To create port we need a listen method using myServer shown in below 
// the method takes one argument which is number

myServer.listen(3000);


