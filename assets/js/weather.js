let weatherAPIkEY = "5fc8e9bc79a5a2e82d9c4120d41402cd";

/**
 * Function that returns an array with day, hour, and, month (as ints) of the ith element in weather array
 *
 * @param {number} i ranging from 0 to the length of weather data list (weatherData.list.length)
 * @returns {Array} containing day, hour, and, month as ints
 */
function getDayHourMonth(weatherData, i) {
  let day = weatherData.list[i].dt_txt.substring(8, 10);
  let hour = weatherData.list[i].dt_txt.substring(10, 13);
  let month = weatherData.list[i].dt_txt.substring(5, 7);
  // console.log(parseInt(day), parseInt(hour), parseInt(month));
  return [parseInt(day), parseInt(hour), parseInt(month)];
}

/**
 * A function that processes the weather data requested from api by using the users day, hour and month input
 * and returns the relevant weather data.
 *
 * @param {object} weatherData object return from a request to weatherAPI.com api
 * @param {int} hour integer representing the hour of day
 * @param {int} day integer representing the day of the month
 * @param {int} month integer representing the month of the year
 * @returns {object} weatherData.list[n] an object containing the relevant weather data the user queries for
 */
function getRelevantWeatherData(weatherData, hour, day, month) {
  for (let i = 0; i < weatherData.list.length - 1; i++) {
    let [dayi, houri, monthi] = getDayHourMonth(weatherData, i);

    let mostRecentWeatherHour = parseInt(
      weatherData.list[0].dt_txt.substring(10, 13)
    );
    let mostRecentWeatherDay = parseInt(
      weatherData.list[0].dt_txt.substring(8, 10)
    );
    // if the hour chosen is within two hours of the last entry use that weather data (the weather data returned is in 3 hour intervals)
    if (
      hour <= mostRecentWeatherHour &&
      hour >= mostRecentWeatherHour - 2 &&
      mostRecentWeatherDay == day
    ) {
      return weatherData.list[0];
    }
    // otherwise look for closest weather data match
    let hourip1 = getDayHourMonth(weatherData, i + 1)[1];
    if (month == monthi && day == dayi) {
      if (hourip1 == 0) {
        hourip1 = 24;
      }
      if (hour == houri) {
        return weatherData.list[i];
      } else if (hour < hourip1 && hour >= houri) {
        return weatherData.list[i + 1];
      }
    }
  }
}

/**
 * A function that request weather information for a lat and long and then processes it with
 * the hour and day input by user to display relevant weather info to the html page
 *
 * @param {Array} latLon an array containing two floats with a max 6 decimal
 *                        places representing latitude and longitude
 * @param {String} weatherAPIkEY string containing weather API key from weatherAPI.com
 */
async function weatherAPIRequest(latLon, weatherAPIkEY, hour, day, month) {
  $.ajax({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${latLon[0]}&lon=${latLon[1]}&units=metric&appid=${weatherAPIkEY}`,
  })
    .done(function (weatherData) {
      let relWeatherData = getRelevantWeatherData(
        weatherData,
        hour,
        day,
        month
      );

      console.log(relWeatherData.weather[0]);
      // For icon solution: https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
      document.getElementById(
        "weather-output"
      ).innerHTML = `<div id="weather-info">
          <img src="https://openweathermap.org/img/w/${
            relWeatherData.weather[0].icon
          }.png" alt="${relWeatherData.weather[0].description} icon" title="${
        relWeatherData.weather[0].description
      }"> 
          <div class="weather-item"><span>|</span> ${
            relWeatherData.main.temp
          } &deg;C</div>
          <div class="weather-item" id="temp-max-min">
            <div>${relWeatherData.main.temp_max} &deg;C</div>
            <div>${relWeatherData.main.temp_min} &deg;C</div>
          </div>
          <div class="weather-item"><span>|</span><img src="assets/images/raindrop-icon-min.webp"/> ${
            relWeatherData.pop * 100
          } %</div>
          <div class="weather-item"><span>|</span> ${
            relWeatherData.wind.speed
          } km/h</div>
          <div class="weather-item"><span>|</span> ${
            relWeatherData.wind.deg
          } deg</div>
        </div>`;
        console.log(relWeatherData);
    })
    .fail(function () {
      // throw error if request fails
      alert(
        "Request failed for weather information",
        "warning",
        "weather-output"
      );
    });
}

// --------------------- Entry Point ---------------------

/**
 * Function that processes the users input in the weather section and either makes a request for the data,
 * reminds the user to pick a time in the future, or to pick a starting point if they have not already
 */
document.getElementById("get-weather").onclick = function () {
  let weatherTime = document.getElementById("weather-input-time").value;

  let weatherDay = document
    .getElementById("weather-input-day")
    .value.split(",");

  let today = new Date();

  let hour = parseInt(weatherTime);
  let day = parseInt(weatherDay[0]);
  let month = parseInt(weatherDay[1]) + 1;

  if (
    !weatherTime ||
    !weatherDay ||
    (hour <= today.getHours() && day == today.getDate())
  ) {
    alert("Please choose a time in the future", "warning", "weather-output");
  } else if (clickRoute[0]) {
    let latLon = [clickRoute[0][1], clickRoute[0][0]];
    // make request for allWeatherData with latLon and day
    weatherAPIRequest(latLon, weatherAPIkEY, hour, day, month);
  } else {
    alert("No Starting point selected", "warning", "weather-output");
  }
};
