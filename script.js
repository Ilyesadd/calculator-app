document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.keypad button');
    const themeSwitcher = document.querySelectorAll('.toggle input');
    const calculator = document.querySelector('.calculator');
    let currentInput = '';
    let operator = null;
    let previousInput = '';
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        const action = button.getAttribute('data-action');
  
        if (value) {
          currentInput += value;
          display.value = currentInput;
        }
  
        if (action === 'delete') {
          currentInput = currentInput.slice(0, -1);
          display.value = currentInput;
        }
  
        if (action === 'reset') {
          currentInput = '';
          previousInput = '';
          operator = null;
          display.value = '';
        }
  
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
          if (currentInput === '') return;
          if (previousInput !== '') {
            calculate();
          }
          operator = action;
          previousInput = currentInput;
          currentInput = '';
        }
  
        if (action === 'calculate') {
          if (operator === null || currentInput === '') return;
          calculate();
          operator = null;
          previousInput = '';
        }
      });
    });
  
    themeSwitcher.forEach(radio => {
      radio.addEventListener('change', (e) => {
        calculator.className = `calculator theme-${e.target.value}`;
      });
    });
  
    function calculate() {
      let result;
      const prev = parseFloat(previousInput);
      const current = parseFloat(currentInput);
  
      if (isNaN(prev) || isNaN(current)) return;
  
      switch (operator) {
        case 'add':
          result = prev + current;
          break;
        case 'subtract':
          result = prev - current;
          break;
        case 'multiply':
          result = prev * current;
          break;
        case 'divide':
          result = prev / current;
          break;
        default:
          return;
      }
  
      currentInput = result.toString();
      display.value = currentInput;
    }
  });