const numbers = Array.from(document.querySelectorAll(".number-key"));
const operators = Array.from(document.querySelectorAll(".operator-key"));
const display = document.querySelector(".display");
const clear = document.querySelector(".clear");
const enter = document.querySelector(".enter-key");
const decimal = document.querySelector(".decimal-key");
const decimal_array = ["click", "keydown"];
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

// You may add a decimal...ONCE. Resets if you type an operator, perform a calculation, or clear out.
function addDecimal() {
    // Prevents case where a duplicate decimal could be added to a returned answer.
    if ((operations.length < 1) && (display.textContent.includes("."))) {
        return;
    };
    if (this.key == ".") {
        display.textContent += decimal.textContent;
        removeDecimalEvents();
        return;
    } else {
        display.textContent += decimal.textContent;
        removeDecimalEvents();
        return;
    };
};

function addOperator(operator) {
        // Prevents an operator from being the first input.
        if (display.textContent == '') {
            return;
        }
        // Forces calculation to occur if one can and escapes from scenarios where two operators are pressed back-to-back.
        if ((operations.length >= 1) && (display.textContent.match(/[0-9]+/g).length <= 1)) {
            clearEntry();
            return;
        } else if (operations.length >= 1) {
            calculate();
        };

        display.textContent += ` ${operator} `;
        operations.push(operator);
        addDecimalEvents();
};



function calculate() {
    // Finds any numbers within the display, then converts them to floats.
    values = display.textContent.match(/[+-]?([0-9]*[.])?[0-9]+/g).map(x => {
        return parseFloat(x);
    });

    console.table(values)

    // Catches misinputs like "1+=" and scraps the whole thing.
    if (values.length != 2) {
        clearEntry();
        return;
    }

    total = operate(operations[0], values[0], values[1]);
 
    // If the number is a whole number, returns the number without the decimal point, otherwise rounds to 2 decimal places.
    if (total % 1 === 0) {
        display.textContent = total
    } else {
        display.textContent = total.toFixed(2);
    }
    addDecimalEvents();
    operations = [];
};

function backspace() {
   popped = display.textContent.split('').pop();
   display.textContent = display.textContent.slice(0, -1);
   if (popped == ".") {
    addDecimalEvents();
   }
   // Clears out extra white space when it hits an operand.
   if ((popped == " ")) {
    display.textContent = display.textContent.slice(0, -2);
    operations = [];
   }
}

// Resets the calculator to its default state. Used in case of errors and when the user presses the clear button.
function clearEntry() {
    total = 0;
    values = [];
    operations = [];
    display.textContent = "";
    addDecimalEvents();
};

window.addEventListener('keydown', function(e) {
    switch(e.key) {
        case "1":
            addNumber("1");
            break;
        case "2":
            addNumber("2");
            break;
        case "3":
            addNumber("3");
            break;
        case "4":
            addNumber("4");
            break;
        case "5":
            addNumber("5");
            break;
        case "6":
            addNumber("6");
            break;
        case "7":
            addNumber("7");
            break;
        case "8":
            addNumber("8");
            break;
        case "9":
            addNumber("9");
            break;
        case "0":
            addNumber("0");
            break;
        case "+":
            addOperator("+");
            break;
        case "-":
            addOperator("-");
            break;
        case "*":
            addOperator("*");
            break;
        case "/":
            addOperator("/");
            break;
        case "=":
        case "Enter":
            calculate();
            break;
        case "Backspace":
            backspace();
            break;
        default:
            break;
    }
});

function addDecimalKeyboard(button) {
    if (button.key == ".") {
        addDecimal();
    }
}

function addDecimalEvents() {
    decimal.addEventListener('click', addDecimal);
    window.addEventListener('keydown', addDecimalKeyboard);
}

function removeDecimalEvents() {
    decimal.removeEventListener('click', addDecimal);
    window.removeEventListener('keydown', addDecimalKeyboard);
}

numbers.forEach(number => {
    number.addEventListener('click', addNumber.bind(null, number.textContent));
});

operators.forEach(operator => {
    operator.addEventListener('click', addOperator.bind(null, operator.textContent));
});

clear.addEventListener('click', clearEntry);
enter.addEventListener('click', calculate);
addDecimalEvents();
