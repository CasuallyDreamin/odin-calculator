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

let ops = ['+', '-', 'x', '/'];

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
    new_button.addEventListener('click', calculate())
    return new_button;
}

function calculate() {
    
}
