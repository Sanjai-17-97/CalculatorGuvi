document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('result');
    let expression = "";

    // Get all buttons by their data-value attributes
    const buttons = document.querySelectorAll('.btn-container button');

    // Add click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            if (value !== null) {
                handleButtonClick(value);
            } else {
                console.error('Button has no data-value attribute');
            }
        });
    });

    function handleButtonClick(value) {
        if (value === 'C') {
            // Clear the display
            expression = "";
            display.value = "";
        } else if (value === '=') {
            // Evaluate the expression
            try {
                display.value = evaluateExpression(expression);
                expression = display.value; // Update expression with result
            } catch {
                display.value = "Error";
                expression = "";
            }
        } else {
            // Append the value to the expression
            expression += value;
            display.value = expression;
        }
    }

    function evaluateExpression(expr) {
        // Safely evaluate the expression with basic arithmetic only
        const allowedChars = /^[0-9+\-*/.%()]*$/;
        if (!allowedChars.test(expr)) {
            throw new Error("Invalid characters in expression");
        }
        return Function('"use strict";return (' + expr + ')')();
    }

    // Keyboard events
    document.addEventListener('keydown', function (e) {
        const key = e.key;

        if (/[0-9]/.test(key) || ['+', '-', '*', '/', '%', '.'].includes(key)) {
            // Handle number and operator keys
            expression += key;
            display.value = expression;
        } else if (key === 'Enter') {
            // Evaluate the expression when Enter is pressed
            try {
                display.value = evaluateExpression(expression);
                expression = display.value; // Update expression with result
            } catch {
                display.value = "Error";
                expression = "";
            }
        } else if (key === 'Backspace') {
            // Remove the last character
            expression = expression.slice(0, -1);
            display.value = expression;
        } else {
            // Handle invalid keys
            if (!['Shift', 'Control', 'Alt', 'Meta'].includes(key)) {
                alert("Only numbers and valid operators are allowed");
                e.preventDefault();
            }
        }
    });
});
