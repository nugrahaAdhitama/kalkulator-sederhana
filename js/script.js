const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const calculate = (n1, operator, n2) => {
  const num1 = parseFloat(n1);
  const num2 = parseFloat(n2);
  if (operator === 'add') return num1 + num2;
  if (operator === 'subtract') return num1 - num2;
  if (operator === 'multiply') return num1 * num2;
  if (operator === 'divide') return num1 / num2;
};

let firstValue = null;
let operatorValue = null;
let awaitingNextValue = false;

const sendNumberValue = (number) => {
  if (awaitingNextValue) {
    display.value = number;
    awaitingNextValue = false;
  } else {
    display.value = display.value === '0' ? number : display.value + number;
  }
};

const sendOperator = (operator) => {
  if (!firstValue) {
    firstValue = display.value;
  }
  awaitingNextValue = true;
  operatorValue = operator;
};

const clearCalculator = () => {
  display.value = '0';
  firstValue = null;
  operatorValue = null;
  awaitingNextValue = false;
};

const calculateResult = () => {
  if (firstValue) {
    display.value = calculate(firstValue, operatorValue, display.value);
    firstValue = null;
    operatorValue = null;
  }
};

for (const button of buttons) {
  if (button.hasAttribute('data-action')) {
    const action = button.getAttribute('data-action');
    if (action === 'clear') {
      button.addEventListener('click', clearCalculator);
    } else if (action === 'calculate') {
      button.addEventListener('click', calculateResult);
    } else {
      button.addEventListener('click', () => sendOperator(action));
    }
  } else {
    button.addEventListener('click', () => sendNumberValue(button.textContent));
  }
}
