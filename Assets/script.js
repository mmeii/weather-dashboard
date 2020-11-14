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

// function for current condition
function currentCondition(city) {

    var queryURL = "";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        // WHEN I view current weather conditions for that city
        // THEN I am presented with the city name
        // the date
        // an icon representation of weather conditions
        // the temperature
        // the humidity
        // the wind speed
        // and the UV index
        // WHEN I view the UV index
        // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    });

    addToHistory();
    futureCondition();
}

// function to add current search to searchHistory
function addtoHistory() {

}

// function for future condition
function futureCondition(city) {

    var queryURL = "";

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
    });
}

// add event listener on submit button
$("button").on("click", currentCondition);




