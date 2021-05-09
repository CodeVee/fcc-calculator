const input = document.getElementById('input');
const output = document.getElementById('output');
const numberBtns = document.getElementsByClassName('numbers');
const operatorBtns = document.getElementsByClassName('operators')

const processNumber = (e) => {
    const value = e.target.value;
    input.innerHTML += value;
};

const processOperator = (e) => {
    const value = e.target.value;
    output.innerHTML = value;
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
})