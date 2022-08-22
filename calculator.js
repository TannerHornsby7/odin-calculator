function add(a, b) {
    let sum = a + b;
    return sum;
}

function subtract(a, b) {
    let total = a - b;
    return total.toPrecision(5);
}

function multiply(a, b) {
    let product = a * b;
    return product.toPrecision(5);
}

function divide(a, b) {
    if(b === 0) {
        return "LMAO";
    }
    let quotient = a / b;
    return quotient.toPrecision(5);
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
let decimal_pressed = false;
let numDeci = 0;

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
            number1 = operate(operator, number1, number2);
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
        decimal_pressed = false;
        numDeci = 0;
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
        console.log(number1);
        console.log(number2);           
    }
    else if (cb == ".") {
        decimal_pressed = true;
        numDeci = 0;
    }
    else if(cb === "="){
        operator_entered = false;
        decimal_pressed = false;
        console.log(operator);
        console.log(number1);
        console.log(number2);
        val = number1;
        number2 = 0;
    } else { //when an operator is entered, number1 becomes
        //our total prior and number 2 is what is entered after
        operator = cb;
        operator_entered = true;
        val = number1;
        numDigits = 0;
        numDeci = 0;
    }

    return val;
}

function getNumber(cb, number) {
    if(numDigits + numDeci > 9) {
        alert("Please enter up to 8 digits");
        numDigits = 0;
        numDeci = 0;
        return;
    }

    if(decimal_pressed) {
        number += +cb / (Math.pow(10, numDeci));
        numDeci++;
    }
    else {
        number *= 10;
        number += +cb;
        numDigits++;
    }
    return number;
}