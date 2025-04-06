// Local Module

// You can create your own module , here module means a piece of code 
// we can divide this code into block and we can reuse the code

// Step 1
// Create a functions  i am creating addNumber,subtract, divide & multiple

function addNumber(a,b){
    return a+b;
}

function subtractNumber(a,b){
    return a-b;
}
function divideNumber(a,b){
    return a/b;
}

function multipleNumber(a,b){
    return a*b;
}

// Step 2
// export the module in object using below code 
module.exports = {addNumber, subtractNumber, divideNumber, multipleNumber};

// now go to index.js and import there and use them 
