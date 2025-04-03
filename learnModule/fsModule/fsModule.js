// FS Module

// The fs (File System) module in node.js is a built-in module that provides an interface for interacting with the file system.
// It allows you to perform various file operations, such as reading from and writing to files, creating and deleting directories

// ==> create Folder or File
// ==> Read Files
// ==> Modify or Renaming Files
// ==> Deleting Files

// importing fs module
const fs = require('fs');

// To read a file follow this steps
// ==> create a file with demo.txt
// ==> Add some text in it 

// To read the file we have method readFile
// readFile method takes three arguments
//  1-arg filename , 2-arg encoder(utf8), 3-arg function
//  3-arg function takes 2-arguments 1-arg err, and 2-arg data

fs.readFile('demo.txt', 'utf8', (err, data)=>{
    if(err){
        console.log(err)
    }
    console.log(data)
})
// if we not use encoder utf8 we get buffer code, Tocheck that remove utf8 from arg and run. you get buffer code in terminal.