// Calculator class to handle all calculator operations
class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.memory = 0;
        this.history = [];
        this.isDegreeMode = true; // true for degrees, false for radians
        this.isSecondMode = false; // for 2nd function toggle
        this.isbasicMode = true; // true for basic, false for basic
        this.expression = ''; // Store full expression for BODMAS
        this.clear();
    }

    // Clear all values and reset calculator
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
        this.expression = '';
    }

    // Delete the last digit
    delete() {
        // If we're showing a result after calculation, clear it
        if (this.shouldResetScreen) {
            this.currentOperand = '0';
            this.shouldResetScreen = false;
            return;
        }
        
        if (this.currentOperand === '0' || this.currentOperand === '') return;
        
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    // Append a number to the current operand
    appendNumber(number) {
        // Handle decimal point - only allow one per number
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        // Reset screen after operation if needed
        if (this.shouldResetScreen) {
            this.currentOperand = number === '.' ? '0.' : number;
            this.shouldResetScreen = false;
            return;
        }
        
        // Replace leading zero unless adding decimal point
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    // Choose an operation (+, -, *, /)  
    chooseOperation(operation) {
        // Don't choose operation if current operand is empty
        if (this.currentOperand === '' || this.currentOperand === '(') return;
        
        // If we just finished an operation (shouldResetScreen is true), replace the last operator
        if (this.shouldResetScreen && this.expression && this.operation) {
            // Remove the last operator from expression and replace it
            this.expression = this.expression.trim();
            const lastSpaceIndex = this.expression.lastIndexOf(' ');
            if (lastSpaceIndex > 0) {
                this.expression = this.expression.substring(0, lastSpaceIndex) + ' ' + operation + ' ';
            }
            this.operation = operation;
            return;
        }
        
        // Add current operand to expression if starting fresh or continuing
        if (this.expression === '') {
            this.expression = this.currentOperand + ' ' + operation + ' ';
        } else if (!this.shouldResetScreen) {
            // Only append current number if we haven't reset the screen
            this.expression += this.currentOperand + ' ' + operation + ' ';
        }
        
        this.operation = operation;
        
        // Mark that next number input should start fresh
        this.shouldResetScreen = true;
    }

    // Perform the calculation
    compute() {
        // Build complete expression
        let fullExpression = this.expression.trim();
        
        // If no expression exists, use current operand as the expression
        if (!fullExpression) {
            // Check if currentOperand contains a function call
            if (this.currentOperand && this.currentOperand !== '0') {
                fullExpression = this.currentOperand;
            } else {
                return;
            }
        } else {
            // If we have current operand and haven't added it yet, add it now
            if (this.currentOperand && !this.shouldResetScreen) {
                fullExpression += this.currentOperand;
            }
        }
        
        // Remove trailing operator if any
        fullExpression = fullExpression.trim();
        const lastChar = fullExpression[fullExpression.length - 1];
        if (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷' || lastChar === '^') {
            fullExpression = fullExpression.slice(0, -1).trim();
        }
        
        // If expression is empty after trimming, nothing to compute
        if (!fullExpression) {
            return;
        }
        
        try {
            // Replace operators for eval
            let evalExpression = fullExpression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-')
                .replace(/\^/g, '**');
            
            // Replace pi and e constants
            // Replace π symbol with Math.PI (do this first)
            evalExpression = evalExpression.replace(/π/g, 'Math.PI');
            
            // Replace text 'pi' with Math.PI (case-insensitive, but not if preceded by 'Math.')
            // Use negative lookbehind to avoid matching PI in Math.PI
            evalExpression = evalExpression.replace(/(?<!Math\.)pi\b/gi, 'Math.PI');
            
            // Replace e only when it's standalone (not part of other words)
            evalExpression = evalExpression.replace(/(?<![a-zA-Z])e(?![a-zA-Z])/g, 'Math.E');
            
            // Replace trigonometric and logarithmic functions
            // Handle degree/radian conversion for trig functions
            const isDeg = this.isDegreeMode;
            const toRad = (deg) => deg * (Math.PI / 180);
            const toDeg = (rad) => rad * (180 / Math.PI);
            
            // Helper function to match and wrap function arguments properly
            const wrapFunctionArgs = (expr, funcName, wrapper) => {
                const regex = new RegExp(`${funcName}\\(([^()]+|\\([^()]*\\))\\)`, 'g');
                return expr.replace(regex, (match, arg) => {
                    return `${funcName}(${wrapper}(${arg}))`;
                });
            };
            
            // Replace log and sqrt functions (no degree conversion needed)
            evalExpression = evalExpression
                .replace(/log\(/g, 'Math.log10(')
                .replace(/ln\(/g, 'Math.log(')
                .replace(/sqrt\(/g, 'Math.sqrt(');
            
            // Replace trig functions with proper argument wrapping
            if (isDeg) {
                evalExpression = wrapFunctionArgs(evalExpression, 'sin', 'toRad').replace(/sin\(/g, 'Math.sin(');
                evalExpression = wrapFunctionArgs(evalExpression, 'cos', 'toRad').replace(/cos\(/g, 'Math.cos(');
                evalExpression = wrapFunctionArgs(evalExpression, 'tan', 'toRad').replace(/tan\(/g, 'Math.tan(');
            } else {
                evalExpression = evalExpression
                    .replace(/sin\(/g, 'Math.sin(')
                    .replace(/cos\(/g, 'Math.cos(')
                    .replace(/tan\(/g, 'Math.tan(');
            }
            
            // Replace inverse trig functions with degree output wrapping
            evalExpression = wrapFunctionArgs(evalExpression, 'arcsin', 'toDeg').replace(/arcsin\(/g, 'Math.asin(');
            evalExpression = wrapFunctionArgs(evalExpression, 'arccos', 'toDeg').replace(/arccos\(/g, 'Math.acos(');
            evalExpression = wrapFunctionArgs(evalExpression, 'arctan', 'toDeg').replace(/arctan\(/g, 'Math.atan(');
            
            // Evaluate the expression (BODMAS is automatically handled)
            let computation = Function('"use strict"; const toRad = (x) => x * (Math.PI / 180); const toDeg = (x) => x * (180 / Math.PI); return (' + evalExpression + ')')();
            
            // Check for invalid results
            if (!isFinite(computation)) {
                this.showError('Invalid calculation');
                this.clear();
                return;
            }
            
            // Handle floating point precision issues
            computation = Math.round(computation * 10000000000) / 10000000000;
            
            // Update the current operand with the result
            this.currentOperand = computation.toString();
            this.operation = undefined;
            this.previousOperand = '';
            this.expression = '';
            this.shouldResetScreen = true;
        } catch (error) {
            this.showError('Invalid expression');
            this.clear();
        }
    }

    // Memory functions
    memoryClear() {
        this.memory = 0;
        this.updateMemoryIndicator();
    }

    memoryRecall() {
        this.currentOperand = this.memory.toString();
        this.shouldResetScreen = true;
    }

    memoryAdd() {
        this.memory += parseFloat(this.currentOperand) || 0;
        this.updateMemoryIndicator();
        this.shouldResetScreen = true;
    }

    memorySubtract() {
        this.memory -= parseFloat(this.currentOperand) || 0;
        this.updateMemoryIndicator();
        this.shouldResetScreen = true;
    }

    // Update memory indicator visibility
    updateMemoryIndicator() {
        const memoryIndicator = document.getElementById('memory-indicator');
        if (this.memory !== 0) {
            memoryIndicator.classList.add('active');
        } else {
            memoryIndicator.classList.remove('active');
        }
    }

    // Square root function
    squareRoot() {
        // Add function to expression instead of calculating immediately
        const funcName = 'sqrt(';
        
        // If starting fresh or after operation, start new expression
        if (this.shouldResetScreen || this.currentOperand === '0' || this.currentOperand === '') {
            this.currentOperand = funcName;
            this.shouldResetScreen = false;
        } else {
            // Append to current operand
            this.currentOperand += funcName;
        }
    }

    // Percentage function
    percentage() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        // Just divide by 100
        this.currentOperand = (current / 100).toString();
        this.shouldResetScreen = true;
        
        // Clear expression since this is a unary operation
        if (!this.operation) {
            this.previousOperand = '';
            this.expression = '';
        }
    }

    // Square function (x²)
    square() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        const result = current * current;
        this.currentOperand = (Math.round(result * 10000000000) / 10000000000).toString();
        this.shouldResetScreen = true;
        
        // Clear expression since this is a unary operation
        this.previousOperand = '';
        this.operation = undefined;
        this.expression = '';
    }

    // Power function (x^y)
    power() {
        this.chooseOperation('^');
    }

    // Compute result only when equals is pressed
    computeResult() {
        // If no expression but have a function call in current operand, use it
        if (!this.expression || this.expression.trim() === '') {
            if (this.currentOperand && this.currentOperand !== '0' && 
                (this.currentOperand.includes('(') || this.currentOperand.includes('sin') || 
                 this.currentOperand.includes('cos') || this.currentOperand.includes('tan') ||
                 this.currentOperand.includes('log') || this.currentOperand.includes('ln') ||
                 this.currentOperand.includes('sqrt') || this.currentOperand.includes('arcsin') ||
                 this.currentOperand.includes('arccos') || this.currentOperand.includes('arctan'))) {
                this.compute();
                return;
            }
            return;
        }
        
        // Build display string for history
        let displayExpression = this.expression.trim();
        
        // Add current operand if we have one and haven't added it yet
        if (this.currentOperand && this.currentOperand !== '0' && !this.shouldResetScreen) {
            displayExpression += this.currentOperand;
        }
        
        // Remove trailing operator from display if any
        const lastChar = displayExpression[displayExpression.length - 1];
        if (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷' || lastChar === '^') {
            displayExpression = displayExpression.slice(0, -1).trim();
        }
        
        // Store the expression before computing
        const exprForHistory = displayExpression;
        
        this.compute();
        
        // Add to history if computation was successful
        if (exprForHistory && this.expression === '') {
            const calculation = `${exprForHistory} = ${this.getDisplayNumber(this.currentOperand)}`;
            this.addToHistory(calculation);
        }
        
        this.updateDisplay();
    }

    // Add calculation to history
    addToHistory(calculation) {
        this.history.unshift({
            calculation: calculation,
            timestamp: new Date().toLocaleTimeString()
        });
        
        // Keep only last 50 calculations
        if (this.history.length > 50) {
            this.history.pop();
        }
        
        this.updateHistoryDisplay();
    }

    // Update history display
    updateHistoryDisplay() {
        const historyList = document.getElementById('history-list');
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<p class="history-empty">No calculations yet</p>';
            return;
        }
        
        historyList.innerHTML = this.history.map((item, index) => 
            `<div class="history-item" data-index="${index}">
                <div class="history-calculation">${item.calculation}</div>
                <div class="history-time">${item.timestamp}</div>
            </div>`
        ).join('');
        
        // Add click listeners to history items
        document.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                const calculation = this.history[index].calculation;
                const result = calculation.split('=')[1].trim();
                this.currentOperand = result.replace(/,/g, '');
                this.updateDisplay();
            });
        });
    }

    // Clear history
    clearHistory() {
        this.history = [];
        this.updateHistoryDisplay();
    }

    // Export history
    exportHistory() {
        if (this.history.length === 0) {
            this.showError('No history to export');
            return;
        }
        
        const csvContent = 'Calculation,Time\n' + 
            this.history.map(item => `"${item.calculation}","${item.timestamp}"`).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `calculator-history-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // Toggle between degree and radian mode
    toggleDegreeMode() {
        this.isDegreeMode = !this.isDegreeMode;
        const degButton = document.querySelector('[data-action="deg"]');
        const secondButton = document.querySelector('[data-action="second"]');
        
        if (degButton) {
            degButton.textContent = this.isDegreeMode ? 'deg' : 'rad';
        }
        
        // Disable 2nd button in radian mode and reset 2nd mode
        if (secondButton) {
            if (this.isDegreeMode) {
                secondButton.disabled = false;
                secondButton.style.opacity = '1';
                secondButton.style.cursor = 'pointer';
            } else {
                secondButton.disabled = true;
                secondButton.style.opacity = '0.5';
                secondButton.style.cursor = 'not-allowed';
                secondButton.classList.remove('active');
                this.isSecondMode = false;
                
                // Re-enable deg/rad button when switching out of deg mode
                const degButton = document.querySelector('[data-action="deg"]');
                if (degButton) {
                    degButton.disabled = false;
                    degButton.style.opacity = '1';
                    degButton.style.cursor = 'pointer';
                }
            }
        }
    }

    // Toggle second mode
    toggleSecondMode() {
        // Don't allow toggling 2nd mode in radian mode
        if (!this.isDegreeMode) {
            this.showError('2nd function only works in degree mode');
            return;
        }
        
        this.isSecondMode = !this.isSecondMode;
        const secondButton = document.querySelector('[data-action="second"]');
        if (secondButton) {
            secondButton.classList.toggle('active');
        }
        
        // Update trig button labels
        const sinButton = document.querySelector('[data-action="sin"]');
        const cosButton = document.querySelector('[data-action="cos"]');
        const tanButton = document.querySelector('[data-action="tan"]');
        
        if (this.isSecondMode) {
            if (sinButton) sinButton.textContent = 'sin⁻¹';
            if (cosButton) cosButton.textContent = 'cos⁻¹';
            if (tanButton) tanButton.textContent = 'tan⁻¹';
        } else {
            if (sinButton) sinButton.textContent = 'sin';
            if (cosButton) cosButton.textContent = 'cos';
            if (tanButton) tanButton.textContent = 'tan';
        }
        
        // Disable/enable deg/rad button when 2nd mode is toggled
        const degButton = document.querySelector('[data-action="deg"]');
        if (degButton) {
            if (this.isSecondMode) {
                degButton.disabled = true;
                degButton.style.opacity = '0.5';
                degButton.style.cursor = 'not-allowed';
            } else {
                degButton.disabled = false;
                degButton.style.opacity = '1';
                degButton.style.cursor = 'pointer';
            }
        }
    }

    // Convert degrees to radians
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    // Trigonometric functions
    sine() {
        // Add function to expression instead of calculating immediately
        const funcName = this.isSecondMode ? 'arcsin(' : 'sin(';
        
        // If starting fresh or after operation, start new expression
        if (this.shouldResetScreen || this.currentOperand === '0' || this.currentOperand === '') {
            this.currentOperand = funcName;
            this.shouldResetScreen = false;
        } else {
            // Append to current operand
            this.currentOperand += funcName;
        }
    }

    cosine() {
        // Add function to expression instead of calculating immediately
        const funcName = this.isSecondMode ? 'arccos(' : 'cos(';
        
        // If starting fresh or after operation, start new expression
        if (this.shouldResetScreen || this.currentOperand === '0' || this.currentOperand === '') {
            this.currentOperand = funcName;
            this.shouldResetScreen = false;
        } else {
            // Append to current operand
            this.currentOperand += funcName;
        }
    }

    tangent() {
        // Add function to expression instead of calculating immediately
        const funcName = this.isSecondMode ? 'arctan(' : 'tan(';
        
        // If starting fresh or after operation, start new expression
        if (this.shouldResetScreen || this.currentOperand === '0' || this.currentOperand === '') {
            this.currentOperand = funcName;
            this.shouldResetScreen = false;
        } else {
            // Append to current operand
            this.currentOperand += funcName;
        }
    }

    // Logarithmic functions
    logarithm() {
        // Add function to expression instead of calculating immediately
        const funcName = 'log(';
        
        // If starting fresh or after operation, start new expression
        if (this.shouldResetScreen || this.currentOperand === '0' || this.currentOperand === '') {
            this.currentOperand = funcName;
            this.shouldResetScreen = false;
        } else {
            // Append to current operand
            this.currentOperand += funcName;
        }
    }

    naturalLog() {
        // Add function to expression instead of calculating immediately
        const funcName = 'ln(';
        
        // If starting fresh or after operation, start new expression
        if (this.shouldResetScreen || this.currentOperand === '0' || this.currentOperand === '') {
            this.currentOperand = funcName;
            this.shouldResetScreen = false;
        } else {
            // Append to current operand
            this.currentOperand += funcName;
        }
    }

    // Factorial function
    factorial() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) || current < 0 || !Number.isInteger(current)) {
            this.showError('Factorial requires non-negative integer');
            return;
        }
        
        if (current > 170) {
            this.showError('Number too large for factorial');
            return;
        }
        
        let result = 1;
        for (let i = 2; i <= current; i++) {
            result *= i;
        }
        
        this.currentOperand = result.toString();
        this.shouldResetScreen = true;
        
        // Clear expression since this is a unary operation
        this.previousOperand = '';
        this.operation = undefined;
        this.expression = '';
    }

    // Reciprocal function
    reciprocal() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) || current === 0) {
            this.showError('Cannot divide by zero');
            return;
        }
        
        const result = 1 / current;
        this.currentOperand = (Math.round(result * 10000000000) / 10000000000).toString();
        this.shouldResetScreen = true;
        
        // Clear expression since this is a unary operation
        this.previousOperand = '';
        this.operation = undefined;
        this.expression = '';
    }

    // Insert Pi
    insertPi() {
        if (this.shouldResetScreen || this.currentOperand === '0') {
            this.currentOperand = 'π';
            this.shouldResetScreen = false;
        } else {
            // Append pi symbol to current operand
            this.currentOperand += 'π';
        }
    }

    // Insert Euler's number
    insertEuler() {
        if (this.shouldResetScreen || this.currentOperand === '0') {
            this.currentOperand = 'e';
            this.shouldResetScreen = false;
        } else {
            // Append e symbol to current operand
            this.currentOperand += 'e';
        }
    }

    // Parentheses handling
    openParenthesis() {
        // Start building expression with opening parenthesis
        if (this.shouldResetScreen || this.currentOperand === '0' || this.currentOperand === '') {
            this.currentOperand = '(';
            this.shouldResetScreen = false;
        } else {
            // Check if last character is a number or closing parenthesis
            const lastChar = this.currentOperand.slice(-1);
            const isNumber = !isNaN(lastChar) && lastChar !== ' ';
            const isClosingParen = lastChar === ')';
            
            // Auto-insert multiplication operator if number or ) precedes (
            if (isNumber || isClosingParen) {
                this.currentOperand += '×(';
            } else {
                // Append to current if already building an expression
                this.currentOperand += '(';
            }
        }
    }

    closeParenthesis() {
        // Add closing parenthesis
        if (this.currentOperand && this.currentOperand !== '0' && this.currentOperand !== '') {
            this.currentOperand += ')';
        }
    }

    // Format number with commas for thousands
    getDisplayNumber(number) {
        if (!number && number !== 0) return '0';
        
        const stringNumber = number.toString();
        
        // If it contains non-numeric characters (like parentheses), return as-is
        if (stringNumber.includes('(') || stringNumber.includes(')')) {
            return stringNumber;
        }
        
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // Update the display with current values
    updateDisplay() {
        this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);
        
        // Show the expression being built
        if (this.expression) {
            this.previousOperandElement.textContent = this.expression;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }

    // Show error message
    showError(message) {
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        setTimeout(() => {
            errorElement.classList.remove('show');
        }, 3000);
    }

    // Toggle between scientific and standard mode
    toggleMode() {
        this.isScientificMode = !this.isScientificMode;
        const buttonsContainer = document.querySelector('.buttons');
        
        if (this.isScientificMode) {
            // scientific mode - 5 columns
            buttonsContainer.className = 'buttons scientific-layout';
            buttonsContainer.innerHTML = `
                <button class="btn btn-scientific" data-action="second">2nd</button>
                <button class="btn btn-scientific" data-action="deg">deg</button>
                <button class="btn btn-scientific" data-action="sin">sin</button>
                <button class="btn btn-scientific" data-action="cos">cos</button>
                <button class="btn btn-scientific" data-action="tan">tan</button>
                
                <button class="btn btn-function" data-action="power">x^y</button>
                <button class="btn btn-scientific" data-action="log">lg</button>
                <button class="btn btn-scientific" data-action="ln">ln</button>
                <button class="btn btn-scientific" data-action="open-paren">(</button>
                <button class="btn btn-scientific" data-action="close-paren">)</button>
                
                <button class="btn btn-function" data-action="square-root">√</button>
                <button class="btn btn-clear" data-action="clear">AC</button>
                <button class="btn btn-delete" data-action="delete">DEL</button>
                <button class="btn btn-function" data-action="percentage">%</button>
                <button class="btn btn-operator" data-operator="/">÷</button>
                
                <button class="btn btn-scientific" data-action="factorial">x!</button>
                <button class="btn btn-number" data-number="7">7</button>
                <button class="btn btn-number" data-number="8">8</button>
                <button class="btn btn-number" data-number="9">9</button>
                <button class="btn btn-operator" data-operator="*">×</button>
                
                <button class="btn btn-scientific" data-action="reciprocal">1/x</button>
                <button class="btn btn-number" data-number="4">4</button>
                <button class="btn btn-number" data-number="5">5</button>
                <button class="btn btn-number" data-number="6">6</button>
                <button class="btn btn-operator" data-operator="-">−</button>
                
                <button class="btn btn-scientific" data-action="pi">π</button>
                <button class="btn btn-number" data-number="1">1</button>
                <button class="btn btn-number" data-number="2">2</button>
                <button class="btn btn-number" data-number="3">3</button>
                <button class="btn btn-operator" data-operator="+">+</button>
                
                <button class="btn btn-mode" data-action="toggle-mode">⇄</button>
                <button class="btn btn-scientific" data-action="euler">e</button>
                <button class="btn btn-number" data-number="0">0</button>
                <button class="btn btn-number" data-number=".">.</button>
                <button class="btn btn-equals" data-action="equals">=</button>
            `;
        } else {
            // Standard mode - 4 columns
            buttonsContainer.className = 'buttons';
            buttonsContainer.innerHTML = `
                <button class="btn btn-clear" data-action="clear">AC</button>
                <button class="btn btn-delete" data-action="delete">DEL</button>
                <button class="btn btn-function" data-action="percentage">%</button>
                <button class="btn btn-operator" data-operator="/">÷</button>
                
                <button class="btn btn-number" data-number="7">7</button>
                <button class="btn btn-number" data-number="8">8</button>
                <button class="btn btn-number" data-number="9">9</button>
                <button class="btn btn-operator" data-operator="*">×</button>
                
                <button class="btn btn-number" data-number="4">4</button>
                <button class="btn btn-number" data-number="5">5</button>
                <button class="btn btn-number" data-number="6">6</button>
                <button class="btn btn-operator" data-operator="-">−</button>
                
                <button class="btn btn-number" data-number="1">1</button>
                <button class="btn btn-number" data-number="2">2</button>
                <button class="btn btn-number" data-number="3">3</button>
                <button class="btn btn-operator" data-operator="+">+</button>
                
                <button class="btn btn-mode" data-action="toggle-mode">⇄</button>
                <button class="btn btn-number" data-number="0">0</button>
                <button class="btn btn-number" data-number=".">.</button>
                <button class="btn btn-equals" data-action="equals">=</button>
            `;
        }
        
        // Re-attach event listeners after DOM update
        this.attachEventListeners();
    }

    // Attach event listeners to all calculator buttons
    attachEventListeners() {
        const buttonsContainer = document.querySelector('.buttons');
        
        // Remove existing listener if it exists to prevent duplicates
        if (this.buttonClickHandler) {
            buttonsContainer.removeEventListener('click', this.buttonClickHandler);
        }
        
        // Create and store the handler
        this.buttonClickHandler = (e) => {
            const button = e.target;
            if (!button.classList.contains('btn')) return;
            
            // Handle number buttons
            if (button.dataset.number !== undefined) {
                this.appendNumber(button.dataset.number);
                this.updateDisplay();
            }
            
            // Handle operation buttons
            if (button.dataset.operator !== undefined) {
                this.chooseOperation(button.dataset.operator);
                this.updateDisplay();
            }
            
            // Handle action buttons
            if (button.dataset.action !== undefined) {
                const action = button.dataset.action;
                
                switch (action) {
                    case 'clear':
                        this.clear();
                        break;
                    case 'delete':
                        this.delete();
                        break;
                    case 'equals':
                        this.computeResult();
                        break;
                    case 'square-root':
                        this.squareRoot();
                        break;
                    case 'percentage':
                        this.percentage();
                        break;
                    case 'square':
                        this.square();
                        break;
                    case 'power':
                        this.power();
                        break;
                    case 'deg':
                        this.toggleDegreeMode();
                        break;
                    case 'second':
                        this.toggleSecondMode();
                        break;
                    case 'sin':
                        this.sine();
                        break;
                    case 'cos':
                        this.cosine();
                        break;
                    case 'tan':
                        this.tangent();
                        break;
                    case 'log':
                        this.logarithm();
                        break;
                    case 'ln':
                        this.naturalLog();
                        break;
                    case 'factorial':
                        this.factorial();
                        break;
                    case 'reciprocal':
                        this.reciprocal();
                        break;
                    case 'pi':
                        this.insertPi();
                        break;
                    case 'euler':
                        this.insertEuler();
                        break;
                    case 'open-paren':
                        this.openParenthesis();
                        break;
                    case 'close-paren':
                        this.closeParenthesis();
                        break;
                    case 'toggle-mode':
                        this.toggleMode();
                        return; // Don't update display, toggleMode handles it
                }
                
                this.updateDisplay();
            }
        };
        
        // Add the event listener
        buttonsContainer.addEventListener('click', this.buttonClickHandler);
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const previousOperandElement = document.getElementById('previous-operand');
    const currentOperandElement = document.getElementById('current-operand');
    const calculator = new Calculator(previousOperandElement, currentOperandElement);

    // Attach all event listeners
    calculator.attachEventListeners();

    // Add event listeners for history functions
    document.getElementById('clear-history').addEventListener('click', () => {
        calculator.clearHistory();
    });

    document.getElementById('export-history').addEventListener('click', () => {
        calculator.exportHistory();
    });

    // Add event listener for theme toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
        
        // Save theme preference
        localStorage.setItem('calculator-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    });

    // Load saved theme preference
    const savedTheme = localStorage.getItem('calculator-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.querySelector('.theme-icon').textContent = '☀️';
    }

    // Add keyboard support
    document.addEventListener('keydown', (e) => {
        // Numbers and decimal point
        if (e.key >= '0' && e.key <= '9' || e.key === '.') {
            calculator.appendNumber(e.key);
            calculator.updateDisplay();
        }
        
        // Operators - convert to display symbols
        if (e.key === '+') {
            calculator.chooseOperation('+');
            calculator.updateDisplay();
        }
        if (e.key === '-') {
            calculator.chooseOperation('−');
            calculator.updateDisplay();
        }
        if (e.key === '*') {
            calculator.chooseOperation('×');
            calculator.updateDisplay();
        }
        if (e.key === '/') {
            calculator.chooseOperation('÷');
            calculator.updateDisplay();
        }
        
        // Equals
        if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            calculator.computeResult();
            calculator.updateDisplay();
        }
        
        // Clear
        if (e.key === 'Escape') {
            calculator.clear();
            calculator.updateDisplay();
        }
        
        // Delete/Backspace
        if (e.key === 'Backspace') {
            calculator.delete();
            calculator.updateDisplay();
        }
    });
});
