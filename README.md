# Basic Calculator

A modern, feature-rich scientific calculator built with HTML, CSS, and JavaScript that performs basic arithmetic, trigonometric, logarithmic, and advanced mathematical operations with full BODMAS/PEMDAS support.

## Features

- **BODMAS/PEMDAS Support**: Correctly evaluates complex expressions following order of operations
- **Expression Building**: Build and visualize complete mathematical expressions before calculating
- **Mode Toggle**: Switch between Scientific (5-column) and Standard (4-column) calculator modes with ⇄ button
- **Scientific Mode**:
  - **Trigonometric Functions**: Sine, Cosine, Tangent with degree/radian modes and inverse functions
  - **Logarithmic Functions**: Common (lg) and Natural (ln) logarithms
  - **Advanced Operations**: Power (x^y), Factorial (x!), Reciprocal (1/x), Square root (√)
  - **Mathematical Constants**: Pi (π) and Euler's number (e)
  - **Parentheses Support**: ( and ) for complex expressions
  - **2nd Function**: Toggle for accessing inverse trigonometric functions
- **Standard Mode**: Simple 4-column layout with essential arithmetic operations
- **Arithmetic Operations**: Addition (+), Subtraction (−), Multiplication (×), and Division (÷)
- **Percentage Calculations**: Simple percentage conversion (divides by 100)
- **Calculation History**: View, recall, and export past calculations with timestamps
- **Theme Customization**: Toggle between light and dark themes with persistent preference
- **Export Functionality**: Export calculation history as CSV file
- **Clean User Interface**: Modern, responsive design that works on desktop and mobile devices
- **Error Handling**: Comprehensive validation for all operations
- **Decimal Support**: Perform calculations with decimal numbers
- **Keyboard Support**: Use your keyboard for faster input with proper operator symbols
- **Visual Feedback**: Button hover and click animations for better user experience
- **Expression Display**: Shows the complete expression being built in real-time

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with modern features (Grid, Flexbox, gradients, transitions)
- **JavaScript (ES6+)**: Calculator logic and DOM manipulation

## Project Structure

```
calculator/
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── script.js       # Calculator functionality
└── README.md       # Documentation (this file)
```

## How to Use

### Opening the Calculator

1. Navigate to the `calculator` directory
2. Open `index.html` in your web browser
3. Alternatively, you can serve it with a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if http-server is installed)
   npx http-server
   ```
4. Open your browser and navigate to `http://localhost:8000`

### Using the Calculator

#### Mouse/Touch Controls

1. **Numbers**: Click on number buttons (0-9) to enter numbers
2. **Decimal Point**: Click the `.` button to add decimal points
3. **Operators**: Click `+`, `−`, `×`, or `÷` to select an operation
4. **Trigonometric Functions**:
   - Click `sin`, `cos`, or `tan` for trigonometric functions
   - Click `2nd` button first, then trig function for inverse (arcsin, arccos, arctan)
   - Click `deg` to toggle between degree and radian mode
5. **Logarithmic Functions**:
   - Click `lg` for common logarithm (base 10)
   - Click `ln` for natural logarithm (base e)
6. **Advanced Functions**:
   - Click `√` to calculate square root
   - Click `x^y` to raise a number to a power
   - Click `x!` for factorial
   - Click `1/x` for reciprocal
   - Click `%` for percentage calculations
7. **Constants & Parentheses**:
   - Click `π` to insert Pi (3.14159...)
   - Click `e` to insert Euler's number (2.71828...)
   - Click `(` and `)` for parentheses
8. **Memory Function**:
   - Click `MR` to recall memory value
9. **Equals**: Click `=` to calculate the result
10. **Clear (AC)**: Click `AC` to clear all and reset the calculator
11. **Delete (DEL)**: Click `DEL` to remove the last digit
12. **Theme Toggle**: Click the moon/sun icon to switch between dark and light themes
13. **History**: 
    - Click any history item to recall that result
    - Click `Export` to download history as CSV
    - Click `Clear` to remove all history

#### Keyboard Controls

- **Numbers**: Press `0-9` keys
- **Decimal Point**: Press `.` key
- **Operators**: Press `+`, `-`, `*`, or `/` keys
- **Calculate**: Press `Enter` or `=` key
- **Clear**: Press `Escape` key
- **Delete**: Press `Backspace` key

### Example Calculations

1. **Simple Addition**: 
   - Click `5` → `+` → `3` → `=` 
   - Expression displays: `5 + 3`
   - Result: `8`

2. **BODMAS Order of Operations**: 
   - Click `5` → `+` → `3` → `×` → `2` → `=` 
   - Expression displays: `5 + 3 × 2`
   - Result: `11` (multiplication happens first: 3 × 2 = 6, then 5 + 6 = 11)

3. **Complex Expression with Parentheses**: 
   - Click `(` → `5` → `+` → `3` → `)` → `×` → `2` → `=` 
   - Expression displays: `(5 + 3) × 2`
   - Result: `16` (parentheses first: 5 + 3 = 8, then 8 × 2 = 16)

4. **Decimal Operations**: 
   - Click `10.5` → `×` → `2` → `=` 
   - Result: `21`

5. **Division by Zero (Error Handling)**: 
   - Click `5` → `÷` → `0` → `=` 
   - Result: Error message "Invalid calculation"

6. **Square Root** (Unary Operation):
   - Click `25` → `√`
   - Result: `5` (immediately calculated, no equals needed)

7. **Percentage**:
   - Click `50` → `%` 
   - Result: `0.5` (50 ÷ 100)

8. **Power Operation**:
   - Click `2` → `x^y` → `8` → `=`
   - Expression displays: `2 ^ 8`
   - Result: `256` (2⁸)

9. **Trigonometric Function**:
   - Ensure `deg` mode is selected
   - Click `30` → `sin`
   - Result: `0.5` (immediately calculated)

10. **Changing Operators**:
    - Click `5` → `+` → `×` (replaces + with ×) → `3` → `=`
    - Expression displays: `5 × 3`
    - Result: `15`

## Features in Detail

### Expression Building & BODMAS Support

- **Real-time Expression Display**: See your complete mathematical expression as you build it
- **BODMAS/PEMDAS Evaluation**: Correctly follows order of operations:
  1. **B**rackets/Parentheses `( )`
  2. **O**rders/Exponents `^`
  3. **D**ivision `÷` and **M**ultiplication `×` (left to right)
  4. **A**ddition `+` and **S**ubtraction `−` (left to right)
- **Operator Replacement**: Change your mind? Press a different operator to replace the last one
- **Expression Persistence**: The expression stays visible until you press equals
- **Smart Parentheses**: Build complex nested expressions with visual feedback
- Example: `5 + 3 × 2` correctly evaluates to `11`, not `16`

### Unary vs Binary Operations

- **Unary Operations** (execute immediately, no equals needed):
  - Square root `√`
  - Factorial `x!`
  - Reciprocal `1/x`
  - Trigonometric functions (sin, cos, tan)
  - Logarithms (lg, ln)
  - Percentage `%`
  - These clear any pending expression and show the result immediately

- **Binary Operations** (build expressions):
  - Arithmetic operators `+`, `−`, `×`, `÷`
  - Power `x^y`
  - These add to the expression and wait for equals `=`

### Advanced Mathematical Operations

- **Trigonometric Functions**:
  - **sin, cos, tan**: Calculate trigonometric ratios
  - **Degree/Radian Mode**: Toggle between deg and rad for angle input
  - **Inverse Functions**: Press `2nd` button, then trig function for arcsin, arccos, arctan
  - Execute immediately when pressed
  - Example: `sin(30°)` = 0.5 in degree mode
  
- **Logarithmic Functions**:
  - **lg (log)**: Common logarithm (base 10)
  - **ln**: Natural logarithm (base e)
  - Error handling for non-positive values
  - Execute immediately when pressed
  - Example: `lg(100)` = 2, `ln(e)` = 1

- **Factorial (x!)**:
  - Calculates factorial of non-negative integers
  - Example: `5!` = 120
  - Limited to n ≤ 170 to prevent overflow
  - Executes immediately when pressed

- **Reciprocal (1/x)**:
  - Calculates the multiplicative inverse
  - Example: `1/4` = 0.25
  - Error handling for division by zero
  - Executes immediately when pressed

- **Square Root (√)**: 
  - Calculate square root with error handling for negative numbers
  - Executes immediately when pressed
  - Example: `√25` = 5

- **Power (x^y)**: 
  - Raise any number to any power
  - Uses standard expression building (requires equals)
  - Example: `2 ^ 8 =` → 256

- **Percentage (%)**: 
  - Converts a number to its decimal percentage (divides by 100)
  - Executes immediately when pressed
  - Example: `50%` = 0.5

- **Mathematical Constants**:
  - **π (Pi)**: 3.141592653589793
  - **e (Euler's number)**: 2.718281828459045
  - Insert when screen is clear or after an operator

- **Parentheses**: 
  - Support for grouping operations in complex expressions
  - Build nested expressions for precise control
  - Example: `(5 + 3) × 2` = 16

### Memory System

- **Memory Recall (MR)**: Display the stored memory value (available in current layout)
- **Full Memory Operations**: M+, M-, MC available in code but simplified in current UI
- Memory is cleared when page refreshes

### Calculation History

- **Automatic Tracking**: All calculations are saved automatically
- **Timestamp**: Each calculation includes the time it was performed
- **Click to Recall**: Click any history item to use its result
- **Export to CSV**: Download your calculation history
- **Persistent Storage**: History is maintained during your session
- **Capacity**: Stores up to 50 most recent calculations

### Theme Customization

- **Light/Dark Modes**: Toggle between two carefully designed color schemes
- **Persistent Preference**: Your theme choice is saved using localStorage
- **Smooth Transitions**: Theme changes animate smoothly
- **Responsive Colors**: All UI elements adapt to the selected theme

### Input Validation

- **Decimal Point**: Only one decimal point is allowed per number
- **Leading Zeros**: Automatically handled (typing `0` then `5` displays `5`)
- **Division by Zero**: Protected with error message
- **Operator Replacement**: Pressing a different operator replaces the last one
- **Screen Reset Logic**: Smart handling of when to clear vs append to display
- **Expression Validation**: Invalid expressions are caught and handled gracefully

### Display Features

- **Current Operand Display**: Large, bold display of the number/expression you're entering
- **Expression Display**: Shows the complete mathematical expression being built above current input
- **Number Formatting**: Numbers formatted with commas for readability, but parentheses and expressions shown as-is
- **Floating Point Precision**: Handles floating-point arithmetic with proper rounding (10 decimal places)
- **Real-time Feedback**: See your expression update as you type
- **Error Messages**: Clear error notifications for invalid operations

### Design Features

- **Dual Mode Calculator**:
  - **Scientific Mode** (5-column grid): 
    - **Row 1**: 2nd | deg | sin | cos | tan
    - **Row 2**: x^y | lg | ln | ( | )
    - **Row 3**: √ | AC | DEL | % | ÷
    - **Row 4**: x! | 7 | 8 | 9 | ×
    - **Row 5**: 1/x | 4 | 5 | 6 | −
    - **Row 6**: π | 1 | 2 | 3 | +
    - **Row 7**: ⇄ | e | 0 | . | =
  
  - **Standard Mode** (4-column grid):
    - **Row 1**: AC | DEL | % | ÷
    - **Row 2**: 7 | 8 | 9 | ×
    - **Row 3**: 4 | 5 | 6 | −
    - **Row 4**: 1 | 2 | 3 | +
    - **Row 5**: ⇄ | 0 | . | =

- **Mode Toggle**: Orange ⇄ button in bottom left to switch between modes
- **Responsive Layout**: Works on various screen sizes (desktop, tablet, mobile)
- **Color-Coded Buttons**: 
  - Gray: Numbers (0-9, decimal point)
  - Orange: Arithmetic operators (÷, ×, −, +), Delete, and Mode toggle
  - Blue: Functions (square root, percentage)
  - Purple: Scientific functions (trig, log, factorial, reciprocal, constants, parentheses)
  - Green: Equals button
  - Red: All Clear (AC)
- **2nd Function Toggle**: Purple button that lights up when activated for inverse functions
- **Degree/Radian Mode**: Toggle button that switches between 'deg' and 'rad'
- **Theme Toggle**: Moon/sun icon in header for easy theme switching
- **Visual Feedback**: Buttons animate on hover and click
- **Gradient Background**: Modern gradient backdrop that changes with theme
- **Dark/Light Display**: High-contrast display for easy reading in both themes
- **History Panel**: Clean, scrollable list of past calculations with export options

## Testing

The calculator has been tested for:

1. **Basic Operations**
   - ✓ Addition, Subtraction, Multiplication, Division
   - ✓ BODMAS order of operations
   - ✓ Chained operations (e.g., `5 + 3 × 2`)
   - ✓ Operator replacement

2. **Expression Building**
   - ✓ Real-time expression display
   - ✓ Complex expressions with multiple operators
   - ✓ Parentheses support
   - ✓ Expression persistence until equals pressed

3. **Advanced Operations**
   - ✓ Square root (√)
   - ✓ Percentage (%)
   - ✓ Power (x^y)
   - ✓ Factorial (x!)
   - ✓ Reciprocal (1/x)

4. **Trigonometric Functions**
   - ✓ Sine, Cosine, Tangent
   - ✓ Inverse functions (arcsin, arccos, arctan)
   - ✓ Degree/Radian mode toggle
   - ✓ Immediate execution

5. **Logarithmic Functions**
   - ✓ Common logarithm (lg)
   - ✓ Natural logarithm (ln)
   - ✓ Error handling for invalid inputs

6. **Mathematical Constants**
   - ✓ Pi (π) insertion
   - ✓ Euler's number (e) insertion

7. **User Interface**
   - ✓ Mode toggle (Scientific ⇄ Standard)
   - ✓ 5-column scientific layout
   - ✓ 4-column standard layout
   - ✓ Button event handling (no double-click issues)
   - ✓ Theme toggle (light/dark)

8. **History Features**
   - ✓ Calculation logging with timestamps
   - ✓ History recall
   - ✓ CSV export
   - ✓ History clearing

9. **Edge Cases**
   - ✓ Division by zero
   - ✓ Square root of negative numbers
   - ✓ Logarithm of non-positive numbers
   - ✓ Factorial of negative/non-integer/large numbers
   - ✓ Multiple decimal points
   - ✓ Very large numbers
   - ✓ Very small decimals
   - ✓ Negative results
   - ✓ Empty expressions
   - ✓ Expressions ending with operators

10. **Input Methods**
    - ✓ Mouse clicks
    - ✓ Keyboard input with correct symbols (×, ÷, −)
    - ✓ Touch input (mobile devices)
    - ✓ Delete/Backspace after calculations

## Known Limitations

- Maximum precision is limited to 10 decimal places to avoid floating-point errors
- Very large numbers (beyond JavaScript's safe integer range) may lose precision
- History is limited to 50 most recent calculations
- History is not persistent across browser sessions (clears on page refresh)
- Memory is cleared on page refresh
- Scientific notation display is now supported for very large/small numbers
- Parentheses are auto-balanced before evaluation
- Complex nested expressions may require careful input

## Recent Enhancements

All previously planned features have been implemented, plus major improvements:

### Calculator Logic Overhaul
- ✓ **BODMAS/PEMDAS Support** - Correctly evaluates expressions following mathematical order of operations
- ✓ **Expression Building System** - Build complete mathematical expressions with real-time display
- ✓ **Operator Replacement** - Change operators before entering next number
- ✓ **Unary Operation Handling** - Immediate execution for functions like √, sin, log, etc.
- ✓ **Binary Operation Chaining** - Properly chain multiple operations like `5 + 3 × 2`
- ✓ **Smart Screen Reset** - Intelligent handling of when to clear vs append to display
- ✓ **Standalone Function Evaluation** - Evaluate expressions like `sin(π/2)` without requiring operations
- ✓ **Proper Function Wrapping** - Degree/radian conversion properly wrapped for accurate results
- ✓ **Nested Function Support** - Support for nested functions like `sin(cos(30))`

### basic Features
- ✓ **Trigonometric Functions** - sin, cos, tan with degree/radian modes
- ✓ **Inverse Trigonometric Functions** - arcsin, arccos, arctan accessible via 2nd button
- ✓ **2nd Button Toggle** - Stays active until manually toggled off, disables deg/rad when active
- ✓ **Button Label Updates** - Trig buttons change to sin⁻¹, cos⁻¹, tan⁻¹ when 2nd is active
- ✓ **Logarithmic Functions** - Common (lg) and natural (ln) logarithms
- ✓ **Function Notation Display** - Shows functions as sin(, cos(, arcsin(, etc. for clarity
- ✓ **Factorial Function** - x! for non-negative integers
- ✓ **Reciprocal Function** - 1/x operation
- ✓ **Mathematical Constants** - π and e buttons with symbol display
- ✓ **Pi Symbol Display** - Displays π symbol instead of numeric value for cleaner expressions
- ✓ **Constant Recognition** - Recognizes both π symbol and "pi" text, "e" for Euler's number
- ✓ **Parentheses Support** - ( and ) visible in expressions
- ✓ **Automatic Multiplication** - `4(3)` automatically interprets as `4×(3)`
- ✓ **Power Operation** - x^y for exponentiation

### User Interface
- ✓ **Dual-Mode Calculator** - Toggle between basic (5-column) and Basic (4-column) modes
- ✓ **Expression Display** - See your complete expression as you build it
- ✓ **Fixed Button Layout** - Properly arranged 5-column basic grid
- ✓ **No Double-Click Issues** - Fixed event listener duplication
- ✓ **Keyboard Support** - Proper operator symbols (×, ÷, −) in keyboard shortcuts
- ✓ **Enhanced Button Colors** - Improved color scheme for better visual distinction:
  - Orange: Operators (+, −, ×, ÷)
  - Red/Pink: Clear (AC) and Delete (DEL)
  - Purple: Scientific functions (sin, cos, tan, log, ln, etc.)
  - Pink (active): 2nd button when toggled
  - Cyan: General functions (√, %, x², etc.)
  - Green: Equals (=)
- ✓ **Mode Toggle Constraints** - 2nd button disabled in radian mode, deg/rad disabled when 2nd active

### Additional Features
- ✓ Memory functions (M+, M-, MR, MC) - Available in code
- ✓ Percentage calculations - Simple conversion (÷ 100)
- ✓ Square root and power operations - Full support
- ✓ Calculation history - Complete history panel with timestamps and CSV export
- ✓ Theme customization - Light/dark mode with localStorage persistence
- ✓ Delete function - Works correctly after calculations

## Future Enhancements

Potential features for future versions:

- [ ] Auto-balancing parentheses
- [ ] Expression syntax highlighting
- [ ] Step-by-step solution display
- [ ] Hyperbolic trigonometric functions (sinh, cosh, tanh)
- [ ] More advanced memory operations in UI
- [ ] Graph plotting for functions
- [ ] Unit conversion capabilities
- [ ] Customizable color themes (beyond light/dark)
- [ ] Complex number support
- [ ] Equation solver
- [ ] Matrix operations
- [ ] Persistent calculation history across sessions

## Browser Support

The calculator works in all modern browsers that support:
- ES6 JavaScript features
- CSS Grid and Flexbox
- CSS Custom Properties
- Modern event handling

Recommended browsers:
- Chrome/Edge 60+
- Firefox 60+
- Safari 12+
- Opera 47+