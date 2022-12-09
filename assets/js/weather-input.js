const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDate = new Date();
let datesArray = [currentDate];

let selectDay = document.getElementById("weather-input-day");

// Following is adapted from https://stackoverflow.com/questions/8674618/adding-options-to-select-with-javascript/8674667
// where I auto fill the options for time
let min = 0,
  max = 23,
  selectTime = document.getElementById("weather-input-time");

for (let t = min; t <= max; t++) {
  let opt = document.createElement("option");
  opt.value = t;
  if (t < 10) {
    opt.innerHTML = "0" + t + ":00";
  } else {
    opt.innerHTML = t + ":00";
  }

  selectTime.appendChild(opt);
}

// https://stackoverflow.com/questions/563406/add-days-to-javascript-date
//
/**
 * A function that takes in a number of days and adds it to the given date and returns that new date.
 * @param {int} days number of days
 * @returns
 */
Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// Make an array using the above function of the dates of the next 4 days
for (let dayNo = 1; dayNo < 4; dayNo++) {
  datesArray.push(currentDate.addDays(dayNo));
}

// Create an option and add that date as the value and day from dayNames as the
// innerHTML. This function keeps the options up to date as there are only 4 days
// of weather info
for (let d = 0; d < 4; d++) {
  let opt = document.createElement("option");
  // value is [dayNo, MonthNo]
  opt.value = [
    parseInt(datesArray[d].getDate()),
    parseInt(datesArray[d].getMonth()),
  ];
  opt.innerHTML = dayNames[datesArray[d].getDay()];
  selectDay.appendChild(opt);
}
