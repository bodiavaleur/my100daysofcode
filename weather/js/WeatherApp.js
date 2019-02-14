class WeatherApp {
    /* Get current weather from OpenWeatherMap.com */
    constructor(city) {
        this.city = city;
        this.months = [
            'jan', 'feb', 'mar', 'apr',
            'may', 'jun', 'jul', 'aug',
            'sep', 'oct', 'nov', 'dec'
        ];
        this.weatherProps = {
            temp: 0,
            pressure: 0,
            wind: 0,
            humidity: 0,
            sunrise: 0,
            sunset: 0,
            main: 0
        };
    }

    getWeatherData() {
        /* Get JSON object with weather data from OpenWeather */
        let xhttp = new XMLHttpRequest();
        const key = '23c71da1b24f9e5e949c7f06844826a0';
        let resp;

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status >= 200 && this.status < 400) {
                    resp = JSON.parse(this.response);
                }
            }
        };

        xhttp.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${key}`, false);
        xhttp.send();
        return resp;
    }

    setWeatherData(wdata) {
        /* Set parsed data to weatherProps object and return it*/
        for (let prop in this.weatherProps) {
            // Get main props (temperature, humidity, pressure e.g)
            let mainProp = wdata['main'][prop];
            // Get sunrise and sunset values
            let sysProp = wdata['sys'][prop];

            // Store to weatherProps only needed value
            if (mainProp != undefined) {
                this.weatherProps[prop] = mainProp;
            } else {
                this.weatherProps[prop] = sysProp;
            }
        }

        this.weatherProps['wind'] = wdata['wind']['speed'];
        // Get weather condition (Clouds, Clear, Rain e.g)
        this.weatherProps['main'] = wdata['weather'][0]['main'];
        return this.weatherProps;
    }

    convertTime(unix) {
        /* // Convert time from UNIX to human readable format */
        let date = new Date(unix * 1000);
        let form = date.toTimeString().split(' ')[0];
        return form
    }
}

export default WeatherApp;