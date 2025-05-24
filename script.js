// Sample data for console demonstrations
const sampleData = {
    name: 'John Doe',
    age: 30,
    skills: ['JavaScript', 'HTML', 'CSS'],
    address: {
        street: '123 Main St',
        city: 'San Diego',
        state: 'CA'
    }
};

// Custom Error class
class CalculatorError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CalculatorError';
    }
}

// Global error handler
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Global error handler caught an error:', {
        message: msg,
        url: url,
        lineNo: lineNo,
        columnNo: columnNo,
        error: error
    });
    return false; // Let the error propagate
};

// Get form and error buttons
const form = document.querySelector('form');
const errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

// Enhanced calculator with error handling
form.addEventListener('submit', e => {
    e.preventDefault();
    const output = document.querySelector('output');
    const firstNum = document.querySelector('#first-num').value;
    const secondNum = document.querySelector('#second-num').value;
    const operator = document.querySelector('#operator').value;

    try {
        // Input validation
        if (!firstNum || !secondNum) {
            throw new CalculatorError('Both numbers are required');
        }

        if (isNaN(firstNum) || isNaN(secondNum)) {
            throw new CalculatorError('Please enter valid numbers');
        }

        if (operator === '/' && parseFloat(secondNum) === 0) {
            throw new CalculatorError('Division by zero is not allowed');
        }

        // Safe calculation instead of eval
        let result;
        switch(operator) {
            case '+':
                result = parseFloat(firstNum) + parseFloat(secondNum);
                break;
            case '-':
                result = parseFloat(firstNum) - parseFloat(secondNum);
                break;
            case '*':
                result = parseFloat(firstNum) * parseFloat(secondNum);
                break;
            case '/':
                result = parseFloat(firstNum) / parseFloat(secondNum);
                break;
            default:
                throw new CalculatorError('Invalid operator');
        }

        output.textContent = result;
    } catch (error) {
        console.error('Calculator Error:', error);
        output.textContent = `Error: ${error.message}`;
    } finally {
        console.log('Calculation attempt completed');
    }
});

// Add event listeners to each button for console demonstrations
errorBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.toLowerCase();
        
        switch(buttonText) {
            case 'console log':
                console.log('Basic console log message:', sampleData);
                break;

            case 'console error':
                console.error('This is an error message!', new Error('Sample Error'));
                break;

            case 'console count':
                console.count('Button clicked');
                break;

            case 'console warn':
                console.warn('This is a warning message!');
                break;

            case 'console assert':
                console.assert(false, 'This assertion failed!');
                break;

            case 'console clear':
                console.clear();
                break;

            case 'console dir':
                console.dir(document.querySelector('main'));
                break;

            case 'console dirxml':
                console.dirxml(document.querySelector('main'));
                break;

            case 'console group start':
                console.group('Group Demo');
                console.log('Item 1');
                console.log('Item 2');
                console.log('Item 3');
                break;

            case 'console group end':
                console.groupEnd();
                break;

            case 'console table':
                console.table([sampleData, {...sampleData, name: 'Jane Doe'}]);
                break;

            case 'start timer':
                console.time('operationTimer');
                break;

            case 'end timer':
                console.timeEnd('operationTimer');
                break;

            case 'console trace':
                console.trace('Trace demo');
                break;

            case 'trigger a global error':
                nonExistentFunction(); // This will trigger a global error
                break;
        }
    });
}); 