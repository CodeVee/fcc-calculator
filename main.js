const input = document.getElementById('input');
const output = document.getElementById('output');
const numberBtns = document.getElementsByClassName('numbers');
const operatorBtns = document.getElementsByClassName('operators');

let firstValue = '';
let secondValue = '';
let operator = '';
let result = '';
let calculated = false;

const calculateValue = () => {
    const firstNumber = parseFloat(firstValue);
    const secondNumber = parseFloat(secondValue);
    calculated = true;
    switch (operator) {
        case '+':
            return firstNumber + secondNumber;
        case '-':
            return firstNumber - secondNumber;
        case '*':
            return firstNumber * secondNumber;
        case '/':
            return firstNumber / secondNumber;
        default:
            return firstNumber;
    }
}

const processNumber = (e) => {
    const value = e.target.value;

    if (operator) {
        const number = parseFloat(secondValue + value);
        secondValue = number.toString();
        output.innerHTML = secondValue;
        input.innerHTML += operator;
    } else {
        const number = parseFloat(firstValue + value);
        firstValue = number.toString();
        output.innerHTML = firstValue;
        input.innerHTML = '';
    }
};

const processOperator = (e) => {
    const value = e.target.value;
    output.innerHTML = value;

    if (calculated) {
        firstValue = result;
        input.innerHTML = result;
        operator = value;
        calculated = false;
        return;
    }

    if (firstValue && secondValue && operator) {
        const result = calculateValue();
        firstValue = result.toString();
        operator = value;
        input.innerHTML = firstValue;
        return;
    }

    if (firstValue) {
        operator = value;
        input.innerHTML = firstValue;
        return;
    }
}

Array.from(numberBtns).forEach(btn => {
    btn.addEventListener('click', processNumber)
})

Array.from(operatorBtns).forEach(btn => {
    btn.addEventListener('click', processOperator)
})

document.getElementById('clear').addEventListener('click', () => {
    input.innerHTML = '';
    output.innerHTML = '0'
    firstValue = '';
    secondValue = '';
    operator = '';
    result = '';
    calculated = false;
})

document.getElementById('equals').addEventListener('click', () => {
    const calcResult = calculateValue();
    result = calcResult.toString();
    output.innerHTML = result;
    input.innerHTML = firstValue + operator + secondValue + '=' + result;
    firstValue = '';
    secondValue = '';
    operator = '';
})
