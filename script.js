const numbers = Array.from(document.querySelectorAll(".number-key"));
const operators = Array.from(document.querySelectorAll(".operator-key"));
const display = document.querySelector(".display");
const clear = document.querySelector(".clear");
const enter = document.querySelector(".enter-key");
let values = [];
let operations = [];
let total = 0;

function add(num1, num2) {
    return num1 + num2; 
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    if (num2 != 0) {
        return num1 / num2;
    };
};

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return "Invalid selection.";
    };
};

function addNumber(num) {
    display.textContent += num;
;}

// TODO: If one operator has already been added, call calculate on the two numbers already entered.

function addOperator(operator) {
        display.textContent += ` ${operator} `;
        operations.push(operator);
};

// Function that takes the first two entries in values and calls operate on them using the first value in operator, then takes the result and the next item in values and calls operate on them using the next value in operator and so on. Must also take the last numerical entry and append it to values!
function calculate() {
    console.log(display.textContent)
    values = display.textContent.match(/[0-9]+/g).map(x => {
        return parseInt(x);
    });
    console.table(values);

    for (let i = 0; i < operations.length; i++) {
        if (i == 0) {
            total = operate(operations[i], values[0], values[1]);
        } else {
            total = operate(operations[i], total, values[i+1]);
        };
    };

    display.textContent = total;
    operations = [];
};

numbers.forEach(number => {
    number.addEventListener('click', addNumber.bind(null, number.textContent));
});

operators.forEach(operator => {
    operator.addEventListener('click', addOperator.bind(null, operator.textContent));
});

function clearEntry() {
    total = 0;
    values = [];
    operations = [];
    display.textContent = "";
};

clear.addEventListener('click', clearEntry);
enter.addEventListener('click', calculate);