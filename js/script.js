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
let fiveDays = document.getElementById('5days');

userSubmit.addEventListener('click', function (e) {
    let city = userInput.value;
    let country = userCountry.value;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lang=sv&country=${country}&key=${API_KEY}`;

    e.preventDefault();
    city = userInput.value;
    userSubmit = userInput;
    console.log(city);


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
            cityTitle.innerText = userSubmit.value
            cityTemp.innerText = data.data[0].temp + ' ' + '\xB0' + 'C';
            let icon = data.data[0].weather.icon;
            weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
            cityWind.innerText = 'Vindhastighet' + ' ' + data.data[0].wind_gust_spd + ' ' + 'm/s';
            cityDesc.innerText = 'Beskrivning av vädret:' + ' ' + data.data[0].weather.description;
            cityHumudity.innerText = 'Luftfuktighet: ' + ' ' + data.data[0].rh + '%';

            for (let i = 1; i < 6; i++) {
                const makeFiveDivs = document.createElement('div');
                fiveDays.appendChild(makeFiveDivs);

                cityTemp.innerText = data.data[i].temp + ' ' + '\xB0' + 'C';
                let icon = data.data[i].weather.icon;
    
                weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
                
                cityDesc.innerText = 'Beskrivning av vädret:' + ' ' + data.data[i].weather.description;
                console.log(i)

            }
        }
    ).catch(
        function (error) {
            console.log(error);
        }
    );

    if (userInput.value === '') {
        console.log('write city');
    }
    else if (userCountry.value === '') {
        console.log('write country dumbass');
    }
});



// fetch("../countries.json")  
//   .then(  
//     function(response) {  
//     //   if (response.status !== 200) {  
//     //     console.warn('Looks like there was a problem. Status Code: ' + 
//     //       response.status);  
//     //     return;  
//     //   }
//     console.log(response);

//       // Examine the text in the response  
//       response.json().then(function(data) {  
//         let option;

//         for (let i = 0; i < data.length; i++) {
//           option = document.createElement('option');
//           countryInput.appendChild(option);
//             option.text = data[i].name;
//             option.value = data[i].code;
//             countryInput.add(option);
//         }    
//       });  
//     }  
//   )  
//   .catch(function(err) {  
//     console.error('Fetch Error -', err);  
//   });