const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");
const numerics = document.querySelectorAll(".numeric");
const operations = document.querySelectorAll(".op");
const equator = document.querySelector(".equator");
const ac = document.querySelector("#key-ac");
const dot = document.querySelector("#theDot");

function addToDisplay(element) {
    if (display.textContent == 0) display.textContent = "";
    if (shouldDelete == true) {
        display.textContent = "";
        shouldDelete = false;
    }
    display.textContent = display.textContent + element.textContent;
}

const space = " ";

function addToDisplayOperator(element) {
    if (display.textContent == 0) return;
    display.textContent = display.textContent + space + element.textContent + space;
}

function addToDisplayDot(element) {
    display.textContent = display.textContent + element.target.textContent;
    dot.disabled = true;
}



const removeTransition = (element) => {
    element.target.classList.remove("clicked");
}

//decorations

buttons.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.add("clicked")
        // console.log(element.textContent)
    }
    )

    element.addEventListener('transitionend', removeTransition);
});



//operation

var firstNum;
var lastNum;
var currentOperator;
var beforeLastNum;
var shouldDelete;

dot.addEventListener('click', e => {
    addToDisplayDot(e);
})

numerics.forEach(element => {
    element.addEventListener('click', e => {
        if(display.textContent.length >= 12) return;
        addToDisplay(e.target);
    })
})

operations.forEach(element => {
    element.addEventListener('click', e => {
        if (currentOperator == undefined) {
        firstNum = parseFloat(display.textContent, 10);
        currentOperator = e.target.textContent;
        shouldDelete = true;
        dot.disabled = false;
        } else if(currentOperator == "+" || currentOperator == "-" || currentOperator == "x" || currentOperator == "/") {
            lastNum = getLastNum(display.textContent);

    switch(currentOperator) {
        case "+":
            solution = add(firstNum, lastNum);
            break;
        case "-":
            solution = substract(firstNum, lastNum);
            break;
        case "x":
            solution = multiply(firstNum, lastNum);
            break;
        case "/":
            solution = divide(firstNum, lastNum);
            break;             
    }
    display.textContent = solution;
    firstNum = solution;
    lastNum = "";
    currentOperator = e.target.textContent;
    shouldDelete = true;
        }
    })
})

const getLastNum = (input) => {
    lastNum = parseFloat(input, 10);
    return lastNum
}


function add (a , b) {
    return a + b;
}

function substract (a , b) {
    return a - b;
}

function multiply (a , b) {
    return a * b;
}

function divide (a , b) {
    return a / b;
}

equator.addEventListener('click', e => {
    if (currentOperator == undefined) return;

    lastNum = getLastNum(display.textContent);

    switch(currentOperator) {
        case "+":
            solution = add(firstNum, lastNum);
            console.log(lastNum);
            break;
        case "-":
            solution = substract(firstNum, lastNum);
            break;
        case "x":
            solution = multiply(firstNum, lastNum);
            break;
        case "/":
            solution = divide(firstNum, lastNum);
            break;             
    }
    display.textContent = solution;
    shouldDelete = true;
    firstNum = "";
    lastNum = "";
    currentOperator = undefined;
    buttons.forEach(button => {
        button.disabled = false;
    })
    
})


ac.addEventListener('click', ()=> {
    display.textContent = 0;
    currentOperator = undefined;
    firstNum = "";
    buttons.forEach(button => {
        button.disabled = false;
    })

})
