import WeatherApp from "./WeatherApp.js";

window.onload = () => {
    // Define DOM elements
    let inpCity = document.getElementById('inp-city');
    let titleCity = document.getElementById('title-city');
    let btnOk = document.getElementById('btn-ok');
    let btnBack = document.getElementById('btn-back');
    let box = document.getElementById('main-box');
    let imgCond = document.getElementById('img-cond');
    let propList = document.getElementsByClassName('w-prop');

    // Check validity of input when typing
    inpCity.addEventListener('keypress', () => {
        let cityReg = new RegExp(/^[a-z]+((\s[a-z]+)?)+$/ig);
        // If city name is valid add green border and enable button
        // Otherwise, disable button and add red border
        if (cityReg.test(inpCity.value)) {
            inpCity.classList.remove('bad');
            inpCity.classList.add('good');
            btnOk.disabled = false;
        } else {
            inpCity.classList.remove('good');
            inpCity.classList.add('bad');
            btnOk.disabled = true;
        }
    });

    // When button is clicked, flip to other container and show weather
    btnOk.addEventListener('click', () => {
        // Define weather object and put city name from input as argument
        let weather = new WeatherApp(inpCity.value);
        // Get current weather, set weather properties, and store them to variable
        let props = weather.setWeatherData(weather.getWeatherData());
        // Change circled image based on current weather condition
        imgCond.src = `./img/conditions/${props.main}.svg`;
        // Convert sunrise and sunset values from UNIX to human readable format
        props.sunrise = weather.convertTime(props.sunrise);
        props.sunset = weather.convertTime(props.sunset);
        // Show city name as title below circled image
        titleCity.innerHTML = inpCity.value;
        // Pass weather props to HTML list
        for (let li of propList) {
            li.innerHTML = props[li.id];
        }

        // Flip container to 180 degrees
        box.classList.toggle('box-rotate');
    });

    // Flip to main container
    btnBack.addEventListener('click', () => {
        box.classList.toggle('box-rotate');
    });
};