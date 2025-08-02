const container = document.querySelector("#container");
const numbers = document.querySelector("#nums");
const operations = document.querySelector("#operations");
const output = document.querySelector("#output");
const execute = document.querySelector("#execute");

let executable = '';

let numkeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '000']

for (numkey of numkeys) {
    numbers.appendChild(
        createButton(numkey)
    )
};

let ops = ['+', '-', '*', '/'];

for (op of ops) {
    operations.appendChild(
        createButton(op)
    )
};

execute.appendChild(createClearButton());
execute.appendChild(createExecButton());

function createButton(title) {
    const new_button = document.createElement('button');
    new_button.textContent = title;
    new_button.addEventListener('click', ()=> {
        executable += title;
        updateOutput()
    });
    return new_button;
}

function updateOutput() {
    output.textContent = executable;
}

function createClearButton() {
    const new_button = document.createElement('button');
    new_button.textContent = 'Clear';
    new_button.addEventListener('click', ()=>{
        executable = '';
        updateOutput()
    });
    return new_button;
}

function createExecButton() {
    const new_button = document.createElement('button');
    new_button.textContent = "="
    new_button.addEventListener('click', evaluate)
    return new_button;
}

function evaluate() {
    executable = calculate(executable)
    updateOutput()
}
function calculate(expr) {
    try {
        // Remove all spaces
        expr = expr.replace(/\s+/g, '');

        // Validate allowed characters: digits, ., + - * /
        if (!/^[\d.+\-*/]+$/.test(expr)) {
            throw new Error("Invalid characters");
        }

        // Convert to tokens
        const tokens = expr.match(/(\d+(\.\d+)?|[+\-*/])/g);
        if (!tokens || isNaN(tokens[0]) || isNaN(tokens[tokens.length - 1])) {
            throw new Error("Malformed expression");
        }

        // Operator precedence: * and / first, then + and -
        const ops = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => {
                if (b === 0) throw new Error("Division by zero");
                return a / b;
            }
        };

        // First pass: *, /
        let i = 0;
        while (i < tokens.length) {
            if (tokens[i] === '*' || tokens[i] === '/') {
                const a = parseFloat(tokens[i - 1]);
                const b = parseFloat(tokens[i + 1]);
                const result = ops[tokens[i]](a, b);
                tokens.splice(i - 1, 3, result.toString());
                i = 0; // reset since array changed
            } else {
                i++;
            }
        }

        // Second pass: +, -
        i = 0;
        while (i < tokens.length) {
            if (tokens[i] === '+' || tokens[i] === '-') {
                const a = parseFloat(tokens[i - 1]);
                const b = parseFloat(tokens[i + 1]);
                const result = ops[tokens[i]](a, b);
                tokens.splice(i - 1, 3, result.toString());
                i = 0;
            } else {
                i++;
            }
        }

        return parseFloat(tokens[0]);
    } catch (err) {
        return "Error";
    }
}
