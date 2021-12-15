const API_KEY = 'cc128a90e8254895b95c7a8fb4344bf6';

const userInput = document.getElementById('getWeather');
let userSubmit = document.getElementById('userSubmit');
const userCountry = document.getElementById('getCountry');
let cityTitle = document.getElementById('cityTitle');
let cityTemp = document.getElementById('temp');
let cityWind = document.getElementById('wind');
let cityDesc = document.getElementById('description');
let cityHumudity = document.getElementById('humidity');
let weatherIcon = document.getElementById('icon');
let fiveDays = document.getElementById('fiveDays');
let errorMsg = document.getElementById('errorMsg');

userSubmit.addEventListener('click', function (e) {
    let city = userInput.value;
    let country = userCountry.value;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lang=sv&country=${country}&key=${API_KEY}`;

    e.preventDefault();
    city = userInput.value;
    userSubmit = userInput;
    console.log(city);

    if (userCountry.value === '' && userInput.value === '') {
        clearSecondDiv();
        clearDiv();
        errorMsg.innerText = 'Please write a country and a city...';
    }
    else if (userInput.value === '') {
        clearSecondDiv();
        clearDiv();

        errorMsg.innerText = 'Please write a city...';
    }
    else if (userCountry.value === '') {
        clearSecondDiv();
        clearDiv();

        errorMsg.innerText = 'Please write a country...';

    }

    else {
        clearError();
        fetch(url).then(
            function (response) {
                console.log(response);
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw 'Something went wrong...'
                }
            }
        ).then(
            function (data) {
                console.log(data)
                cityTitle.innerText = userSubmit.value + ' ' + data.country_code;
                cityTemp.innerText = data.data[0].temp + ' ' + '\xB0' + 'C';
                let icon = data.data[0].weather.icon;
                weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
                cityWind.innerText = 'Vindhastighet' + ' ' + data.data[0].wind_gust_spd + ' ' + 'm/s';
                cityDesc.innerText = 'Beskrivning av vädret:' + ' ' + data.data[0].weather.description;
                cityHumudity.innerText = 'Luftfuktighet: ' + ' ' + data.data[0].rh + '%';



                for (let i = 1; i < 6; i++) {
                    const makeFiveDivs = document.createElement('div');
                    const cityTitleDiv = document.createElement('h1');
                    const weatherIconDiv = document.createElement('img');
                    const cityDescDiv = document.createElement('p');
                    const cityTempDiv = document.createElement('p');

                    cityTitleDiv.innerText = data.data[i].valid_date;
                    weatherIconDiv.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
                    cityTempDiv.innerText = data.data[i].temp + ' ' + '\xB0' + 'C';
                    cityDescDiv.innerText = data.data[0].weather.description;

                    makeFiveDivs.appendChild(cityTitleDiv);
                    makeFiveDivs.appendChild(weatherIconDiv);
                    makeFiveDivs.appendChild(cityTempDiv);
                    makeFiveDivs.appendChild(cityDescDiv);
                    fiveDays.appendChild(makeFiveDivs);
                }
            }
        ).catch(
            function (error) {
                console.log(error);
            }
        );
        clearSecondDiv()

    }
});

function clearDiv() {
    const divElement = document.querySelectorAll('#results *')
    for (let element of divElement) {
        element.innerText = '';
        element.src = '';
    }
}

function clearSecondDiv() {
    const divEl = document.querySelectorAll('#fiveDays *')
    for (let i = 0; i < divEl.length; i++) {
        let el = divEl[i];
        el.remove();
    }
}

function clearError() {
    const divElement = document.querySelectorAll('#errorDiv *')
    for (let element of divElement) {
        element.innerText = '';
    }
}