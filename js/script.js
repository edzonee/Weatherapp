const API_KEY = "cc128a90e8254895b95c7a8fb4344bf6";

const userInput = document.getElementById("getWeather");
let userSubmit = document.getElementById("userSubmit");
const userCountry = document.getElementById("getCountry");
let cityTitle = document.getElementById("cityTitle");
let cityTemp = document.getElementById("temp");
let cityWind = document.getElementById("wind");
let cityDesc = document.getElementById("description");
let cityHumudity = document.getElementById("humidity");
let weatherIcon = document.getElementById("icon");
let fiveDays = document.getElementById("fiveDays");
let errorMsg = document.getElementById("errorMsg");
let divBorder = document.getElementById("results");
let divFiveDays = document.getElementById("fiveDays");

userSubmit.addEventListener("click", function (e) {
  let city = userInput.value;
  let country = userCountry.value;
  let urlCurrent = `https://api.weatherbit.io/v2.0/current?key=8a23c972397e47c09f3a3188e596ff7f&lang=sv&units=m&city=${city}&country=${country}`;
  let urlForeCast = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lang=sv&country=${country}&key=${API_KEY}`;

  e.preventDefault();
  city = userInput.value;
  userSubmit = userInput;

  if (userInput.value === "") {
    clearSecondDiv();
    errorMsg.innerText = "Var vänlig och skriv en stad...";
    clearWeather();
    
  } else {
    clearError();

    $(divBorder).on("mouseenter", function () {
      $("#results").css("backgroundColor", "black");
      $("#results").css("color", "white");
    });

    $(divBorder).on("mouseleave", function () {
      $("#results").css("backgroundColor", "rgb(235, 235, 235)");
      $("#results").css("color", "black");

    });
    fetch(urlCurrent)
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw "Server error";
        }
      })
      .then(function (data) {
        divBorder.style.display = "block";
        divFiveDays.style.display = "flex";

        cityTitle.innerText =
          userSubmit.value + " " + data.data[0].country_code;
        cityTemp.innerText = data.data[0].temp + " " + "\xB0" + "C";
        let icon = data.data[0].weather.icon;
        weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
        cityWind.innerText =
          "Vindhastighet" + " " + data.data[0].wind_spd + " " + "m/s";
        cityDesc.innerText =
          "Beskrivning av vädret:" + " " + data.data[0].weather.description;
        cityHumudity.innerText =
          "Luftfuktighet: " + " " + data.data[0].rh + "%";
        divBorder.style.boxShadow = "0 2px 10px 0 rgba(93, 95, 96, 0.83)";
        divBorder.style.backgroundColor = "rgb(235, 235, 235)";
      })
      .catch(function (error) {
        console.log(error);
      });

    fetch(urlForeCast)
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          if (response.statusText === "No Content") throw "fel";
          else return response.json();
        } else {
          throw "Something went wrong...";
        }
      })
      .then(function (data) {
        for (let i = 1; i < 6; i++) {
          const makeFiveDivs = document.createElement("div");
          const cityTitleDiv = document.createElement("h2");
          const weatherIconDiv = document.createElement("img");
          let icon = data.data[i].weather.icon;
          const cityDescDiv = document.createElement("p");
          const cityTempDiv = document.createElement("p");

          cityTitleDiv.innerText = data.data[i].valid_date;
          weatherIconDiv.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
          cityDescDiv.innerText = data.data[i].weather.description;
          cityTempDiv.innerText = data.data[i].temp + " " + "\xB0" + "C";

          makeFiveDivs.appendChild(cityTitleDiv);
          makeFiveDivs.appendChild(weatherIconDiv);
          makeFiveDivs.appendChild(cityTempDiv);
          makeFiveDivs.appendChild(cityDescDiv);
          fiveDays.appendChild(makeFiveDivs);
          fiveDays.style.boxShadow = "0 2px 10px 0 rgba(93, 95, 96, 0.83)";
        }
      })
      .catch(function (error) {
        if (error === "fel") {
          errorMsg.innerText = "Var vänlig och skriv en giltig kombination...";

          clearWeather();
        }
      });
    clearSecondDiv();
  }
});

function clearDiv() {
  const divElement = document.querySelectorAll("#results *");
  for (let element of divElement) {
    element.innerText = "";
    element.src = "";
  }
}

function clearSecondDiv() {
  const divEl = document.querySelectorAll("#fiveDays *");
  for (let i = 0; i < divEl.length; i++) {
    let el = divEl[i];
    el.remove();
  }
}

function clearError() {
  const divElement = document.querySelectorAll("#errorDiv *");
  for (let element of divElement) {
    element.innerText = "";
  }
}

function clearWeather() {
  divFiveDays.style.display = "none";
  divBorder.style.display = "none";
}