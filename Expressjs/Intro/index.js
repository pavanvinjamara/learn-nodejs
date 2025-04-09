// ExpressJS
// step 1
// ==> Create a folder and open in vs code open the terminal using(Ctrl+`)
// ==> Check the folder path and type npm init.
// ==> It creates one file package.json, which gives information about project
// ==> create a file in this i created index.js and run using node filename
// ==> if you want to check or monitor continously changes in your file we use nodeman package

// What is nodemon?
// nodemon is a development tool that automatically restarts your Node.js application whenever it detects changes in your code files.

//==> Step 1 Installing nodemon use the command (npm i nodemon) * check the folder path
//==>  check package.json dependencies whether installed or not
//==>  Step 2 In package.json  we have script key and it has value which is a object,
// ===> In that create a key 'start' and it's value is a string (nodemon filename) as shown in below
//  ===============> "start": "nodemon index.js"
// Step 3 Use the command in terminal "npm start" which run the file continously and we check output * * check the folder path
// To stop terminal click (Ctrl + C) it ask's Y/N type y to stop terminal
console.log("pavan");    
