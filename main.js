const input = document.getElementById('input');
const output = document.getElementById('display');
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
        if (!secondValue) {
            input.innerHTML += operator;
        }
        
        if (value === '.' && !secondValue.includes(value)) {
            if (secondValue) {
                secondValue += value;
            } else {
                secondValue = '0.'
            }
        }

        if (value !== '.') {
            let num = '';
            if (secondValue.includes('.')) {
                num = secondValue + value;
            } else {
                const number = parseFloat(secondValue + value);
                num = number.toString();
            }
            
            secondValue = num;
            
        }
        output.innerHTML = secondValue;  
    } else {
        if (value === '.' && !firstValue.includes(value)) {
            if (firstValue) {
                firstValue += value;
            } else {
                firstValue = '0.'
            }
        }

        if (value !== '.') {
            let num = '';
            if (firstValue.includes('.')) {
                num = firstValue + value;
            } else {
                const number = parseFloat(firstValue + value);
                num = number.toString();
            }
            
            firstValue = num;
            
        }

        output.innerHTML = firstValue;
        input.innerHTML = '';
        
    }
};

const processOperator = (e) => {
    const value = e.target.value;
    output.innerHTML = value;

    if (calculated) {
        firstValue = result;
        secondValue = '';
        input.innerHTML = result;
        calculated = false;
        operator = value;
        return;
    }

    if (firstValue && secondValue && operator) {
        const result = calculateValue();
        firstValue = result.toString();
        secondValue = '';
        input.innerHTML = firstValue;
        calculated = false;
        operator = value;
        return;
    }

    if (firstValue) {
        input.innerHTML = firstValue;
        operator = value;
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
