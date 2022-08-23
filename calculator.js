function add(a, b) {
    let sum = a + b;
    return sum;
}

function subtract(a, b) {
    let total = a - b;
    return total;
}

function multiply(a, b) {
    let product = a * b;
    return product;
}

function divide(a, b) {
    if(b === 0) {
        return "LMAO";
    }
    let quotient = a / b;
    return quotient;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '÷':
            return divide(a, b);
            break;
        case 'X':
            return multiply(a, b);
            break;
        default:
            return "invalid input";
    }
}

const output = document.querySelector('.output');
const buttons = document.querySelectorAll('.button');

let currentButton = "0";
let number1 = 0;
let number2 = 0;
let operator = " ";
let operator_entered = false;
let numDigits = 0;

buttons.forEach(button => { 
    button.addEventListener('click', () => {
        currentButton = button.textContent;
        let val = getAction(currentButton);
        output.textContent = val;
    }); 
});

function getAction(cb) {
    let val = 0;
   
    if(cb >= 0 && cb < 10) {
        if(operator_entered) {
            number2 = getNumber(cb, number2);
            val = number2;
            console.log(number1);
            // console.log(number1);
        }
        else {
            number1 = getNumber(cb, number1);
            val = number1;
        }
    }
    else if(cb === "MC") {
        operator_entered = false;
        number1 = 0;
        number2 = 0;
        operator = " ";
        val = "";
        numDigits = 0;
    }
    else if(cb === "-/+") {
        if(operator_entered) {
            number2 *= -1;
            val = number2;
        }
        else {
            number1 *= -1;
            val = number1;
        }     
    }
    else if(cb === ".") {
        if(operator_entered) {
            number2 = getNumber(cb, number2);
            val = number2;
        }
        else {
            number1 = getNumber(cb, number1);
            val = number1;
        }
    }
    else if(cb === "="){
        number1 = operate(operator, number1, number2);
        console.log(number1);
        operator_entered = false;
        val = number1.toPrecision(4);
        number2 = 0;
    } else { //when an operator is entered, number1 becomes
        //our total prior and number 2 is what is entered after
        if(Number.isNaN(number1)) return;
        operator = cb;
        operator_entered = true;
        val = number1.toPrecision(4);
        numDigits = 0;
    }

    return val;
}

function getNumber(cb, number) {
    if(numDigits > 9) {
        alert("Please enter up to 8 digits");
        numDigits = 0;
        return;
    }
    number *= 10;
    // console.log(cb);
    // console.log(number);
    number += +cb;
    numDigits++;
    return number;
}