// Importing Local module

const http = require('http');

// Step 1
// To import local module we use destruction object and require method in that we pass the path of local module which created

const {addNumber, subtractNumber, divideNumber, multipleNumber} = require('./localModule');

// Step 2 
// Use the function
console.log(addNumber(10, 2));
console.log(subtractNumber(22, 2));
console.log(divideNumber(12, 2));
console.log(multipleNumber(4, 2));

// Step 3
// run the index file node index check output


let myServer =http.createServer((request, response)=>{
    response.write("welcome to nodejs");
    response.end();
});

myServer.listen(3000);