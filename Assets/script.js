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
var searchHistoryList = [];
// var day1 = moment().add(1, 'days').calendar(); 
// var day2 = moment().add(2, 'days').calendar(); 
// var day3 = moment().add(3, 'days').calendar(); 
// var day4 = moment().add(4, 'days').calendar(); 
// var day5 = moment().add(5, 'days').calendar(); 


// function for current condition
function currentCondition(city) {

    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(cityWeatherResponse) {
        $("#weatherContent").css("display", "block");
        console.log(cityWeatherResponse);
        $("#cityDetail").empty();
        var iconCode = cityWeatherResponse.weather[0].icon;
        var iconURL = `http://openweathermap.org/img/w/${iconCode}.png`;

        // WHEN I view current weather conditions for that city
        // THEN I am presented with the city name
        // the date
        // an icon representation of weather conditions
        // the temperature
        // the humidity
        // the wind speed
        const currentCity = $(`
            <h2 id="currentCity">
                ${cityWeatherResponse.name} ${today} <img src="${iconURL}" alt="${cityWeatherResponse.weather[0].description}" />
            </h2>
            <p>Temperature: ${cityWeatherResponse.main.temp} °F</p>
            <p>Humidity: ${cityWeatherResponse.main.humidity}\%</p>
            <p>Wind Speed: ${cityWeatherResponse.wind.speed} MPH</p>
        `);

        // add city searched to local storage

        // const searchedCity = $(`
        //     <li class="list-group-item">${cityWeatherResponse.name}</li>
        //     `);

        $("#cityDetail").append(currentCity);
        // $("#searchHistory").append(searchedCity);

        // UV index
        var lat = cityWeatherResponse.coord.lat;
        var lon = cityWeatherResponse.coord.lon;
        var uviQueryURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        // chain .then(function());
        $.ajax({
            url: uviQueryURL,
            method: "GET"
        }).then(function(uviResponse) {
            console.log(uviResponse.value);

            const uvIndex = uviResponse.value;
            const uvIndexP = $(`
                <p>UV Index: 
                    <span id="uvIndexColor" class="px-2 py-2 rounded">${uvIndex}</span>
                </p>
            `);

            $("#cityDetail").append(uvIndexP);

            futureCondition(lat, lon);

            // WHEN I view the UV index
            // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
            // 0-2 green#3EA72D, 3-5 yellow#FFF300, 6-7 orange#F18B00, 8-10 red#E53210, 11+violet#B567A4
            if (uvIndex >= 0 && uvIndex <= 2) {
                $("#uvIndexColor").css("background-color", "#3EA72D").css("color", "white");
            } else if (uvIndex >= 3 && uvIndex <= 5) {
                $("#uvIndexColor").css("background-color", "#FFF300");
            } else if (uvIndex >= 6 && uvIndex <= 7) {
                $("#uvIndexColor").css("background-color", "#F18B00");
            } else if (uvIndex >= 8 && uvIndex <= 10) {
                $("#uvIndexColor").css("background-color", "#E53210").css("color", "white");
            } else {
                $("#uvIndexColor").css("background-color", "#B567A4").css("color", "white"); 
            };  
        });
    });
}

// addToHistory();

// function to add current search to searchHistory
function addToHistory() {

}

// function for future condition
function futureCondition(lat, lon) {

    // THEN I am presented with a 5-day forecast
    var futureURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;

    $.ajax({
        url: futureURL,
        method: "GET"
    }).then(function(futureResponse) {
        console.log(futureResponse);
        $("#fiveDay").empty();
        
        for (let i = 1; i < 6; i++) {
            var cityInfo = {
                date: futureResponse.daily[i].dt,
                icon: futureResponse.daily[i].weather[0].icon,
                temp: futureResponse.daily[i].temp.day,
                humidity: futureResponse.daily[i].humidity
            };

            var currDate = moment.unix(cityInfo.date).format("MM/DD/YYYY");
            console.log(currDate);
            var iconURL = `<img src="http://openweathermap.org/img/w/${cityInfo.icon}.png" alt="${futureResponse.daily[i].weather[0].main}" />`;

            console.log(iconURL);

            // displays the date
            // an icon representation of weather conditions
            // the temperature
            // the humidity
            const futureCard = $(`
                <div class="pl-3">
                    <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;>
                        <div class="card-body">
                            <h5>${currDate}</h5>
                            <p>${iconURL}</p>
                            <p>Temp: ${cityInfo.temp} °F</p>
                            <p>Humidity: ${cityInfo.humidity}\%</p>
                        </div>
                    </div>
                <div>
            `);

            $("#fiveDay").append(futureCard);
        }
    }); 
}

$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    var city = $("#enterCity").val().trim();
    currentCondition(city);
    searchHistoryList.push(city);
    localStorage.setItem("city", JSON.stringify(searchHistory));
    // addToHistory();
});