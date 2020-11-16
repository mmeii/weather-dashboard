/**
 * CRITERIA
 */

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast

var apiKey = "d1e2d0763204896fd894698f5c6e27ee";
var today = moment().format('L');
var day1 = moment().add(1, 'days').calendar(); 
var day2 = moment().add(2, 'days').calendar(); 
var day3 = moment().add(3, 'days').calendar(); 
var day4 = moment().add(4, 'days').calendar(); 
var day5 = moment().add(5, 'days').calendar(); 


// function for current condition
function currentCondition(city) {

    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#weatherContent").css("display", "block");
        console.log(response);
        var iconCode = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        // WHEN I view current weather conditions for that city
        // THEN I am presented with the city name
        // the date
        // an icon representation of weather conditions
        // the temperature
        // the humidity
        // the wind speed
        const currentCity = $(`
            <h2 id="currentCity">
                ${response.name} ${today} <img src="${iconURL}" alt="current weather icon" />
            </h2>
            <p>Temperature: ${response.main.temp}</p>
            <p>Humidity: ${response.main.humidity}</p>
            <p>Wind Speed: ${response.wind.speed} MPH</p>
        `);

        $("#cityDetail").append(currentCity);

        // and the UV index
        // WHEN I view the UV index
        // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

        // display everything
    });
}

// addToHistory();
// futureCondition();


// function to add current search to searchHistory
function addtoHistory() {

}

// function for future condition
function futureCondition(city) {

    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q="${city}&units=imperial&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        // THEN I am presented with a 5-day forecast
        // displays the date
        // an icon representation of weather conditions
        // the temperature
        // the humidity

        // display everything
    });
}

$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    var city = $("#enterCity").val().trim();
    currentCondition(city);
});