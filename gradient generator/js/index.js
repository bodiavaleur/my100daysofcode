window.onload = () => {
    const gradbox = document.getElementById('gradbox');
    const gradCss = document.getElementById('css-text');
    const inputs = document.getElementsByClassName('input');
    const btnRoll = document.getElementById('btn-roll');
    const btnGetCode = document.getElementById('btn-getcode');
    let deg = 0; // Degree for background gradient rotating
    let colorPrefs = {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0,
        angle: 90,
        width: 50,
    }

    // Change gradiend on every preference change
    for (let element of inputs) {
        element.addEventListener('change', () => {
            validateInput(element);
            getInputValue(inputs, colorPrefs);
            gradbox.style.background = makeGradient(colorPrefs);
        })
    }

    // Set random gradient on click
    btnRoll.addEventListener('click', () => {
        updateColors(inputs, colorPrefs);
        gradbox.style.background = makeGradient(colorPrefs);
    })

    // Show CSS code for current gradient
    btnGetCode.addEventListener('click', () => {
        showGradCss(gradCss, colorPrefs);
    })

    // Animate body background
    setInterval(() => {
        if (deg > 360) deg = 0;
        deg += 5;
        document.body.style.background = `linear-gradient(${deg}deg, #08AEEA 0%, #2AF598 100%)`;
    }, 200);
};

function validateInput(input) {
    /* Validate input numbers
     * If number is more than max value then set default value 
     */
    function validate(val) {
        if (input.valueAsNumber > val || input.valueAsNumber < 0) {
            input.value = '' + val;
        }
    }

    switch (input.name) {
        case 'red':
        case 'green':
        case 'blue':
            validate(255);
            break;
        case 'alpha':
            validate(100);
            break;
        case 'angle':
            validate(360);
            break;
        case 'width':
            validate(100);
            break;
    }
}

function getInputValue(input, colors) {
    /* Add input value from single element to colorPrefs */
    for (let el of input) {
        colors[el.name] = el.value;
    }
}

function setRandomValue(inputType) {
    /* Choose random preferences */
    const max = parseInt(inputType.max);
    return Math.round(Math.random() * max);
}

function makeGradient(colors) {
    /* Apply current preferences to element's css background*/
    const firstGrad = (
        `rgba(${colors.red}, ${colors.green}, ${colors.blue}, ${colors.alpha*0.01})`
    );
    const secondGrad = (
        `rgba(${Math.round(colors.red/2)}, ${Math.round(colors.green/2)}, ${Math.round(colors.blue/2)}, 1)`
    );
    const grad = (
        `linear-gradient(${colors.angle}deg, ${firstGrad} ${colors.width}%, ${secondGrad} 100%)`
    );

    return grad;
}

function updateColors(input, colors) {
    /* Add input value from all elements to colorPrefs*/
    for (let el of input) {
        colors[el.name] = setRandomValue(el);
        el.value = colors[el.name];
    }
}

function showGradCss(box, colors) {
    /* Show CSS code for current gradient */
    box.classList.toggle('show');
    box.firstElementChild.innerHTML = 'background: ' + makeGradient(colors);
}