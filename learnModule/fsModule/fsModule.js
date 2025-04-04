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

// ==> Create a file  
// Using writeFile method we can create a file 
// This method takes three arguments, 
// 1) file Name ,
// 2) encoder (utf8) or Content,
// 3) function which has one argument error

fs.writeFile("example.html", 'utf8',(err)=>{
    if(err)
        console.log(err);
    else
        console.log("file is created");
})
// by using this we created example.html

// Adding Content to file
//  same like above just in place of utf8 pass content

let content = "welcome to dynamic created file and content"

fs.writeFile("sample.txt", content,(err)=>{
    if(err)
        console.log(err);
    else
        console.log("file is created");
})

// Rename file name using fs Module
// Using rename method we can modify the file name which is already existed.
// This method takes three arguments, 
// 1) existed file Name ,
// 2) new name,
// 3) function which has one argument error

fs.rename('sample.txt', 'changeSample.txt', (err)=>{
    if(err)
        console.log(err);
    else
        console.log("changed name Successfully")
})

// Deleting the file 
// Using unlink method you can delete the file which is existed
// This method takes two arguments, 
// 1) existed file Name ,
// 2) function which has one argument error

fs.unlink('changeSample.txt', (err)=>{
    if(err)
        console.log(err);
    else
        console.log("deleted file Successfully")
})

// By using fs Module you can perform curd operation
// try examples with chatgtp