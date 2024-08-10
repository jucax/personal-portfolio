let calculation = localStorage.getItem('calculation') || '';

function updateCalculation(character) {
    calculation += character;

    const output = document.querySelector('.js-result');
    output.innerHTML = calculation;

    localStorage.setItem('calculation', JSON.stringify(calculation));
}