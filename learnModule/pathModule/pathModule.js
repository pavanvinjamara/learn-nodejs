// Path Module
// To know current folder and file
console.log(__dirname); // for folder
console.log(__filename); // for file

// Path module is used for to interact with files and folders
// import the path module using require statement
const path = require('path');

console.log(path.dirname(__filename)); // to get folder path (C:\Users\V Srinath\learn-nodejs\learn-nodejs\learnModule)
console.log(path.basename(__filename)); // file name with extenstio (pathModule.js)
console.log(path.extname(__filename)); // To know dot extention (.js)

// To get all the data of file  in object
console.log(path.parse(__filename));
