// # ✅ Aufgabenstellung

// - Heute erstellt ihr eine Wetter-App! **🌤️**
// - Für dieses Projekt verwendet ihr die [Open Weather API](https://openweathermap.org/guide), um eine App mit aktuellen Wetter-Daten zu erstellen.
// - Um diese API nutzen zu können und einen API-Key zu erhalten, müsst ihr euch registrieren.
//     - Registriert euch am Besten direkt auf der Seite für den “Free”-Tier, damit ihr einen API Key zugeteilt bekommt. Die Aktivierung des Keys kann nämlich einige Minuten in Anspruch nehmen, und ohne Key könnt ihr die API nicht nutzen!
// - Bei Design und Funktion der App könnt ihr selbst entscheiden.
//     - Seiten, die das aktuelle Wetter anzeigen und um euch inspirieren zu lassen, gibt es genug:
//         - https://www.wetter.com/
//         - https://www.wetteronline.de/
//         - https://dribbble.com/tags/weather-app
//         - Pinterest

// ---

// - Workflow Gruppenarbeit / GitHub
//     - Schaut euch den Workflow zur Teamarbeit in Git an
//     - Nutzt PAP/Flowcharts
//     - Verteilt Aufgaben, bleibt kommunikativ! → Teamwork makes the dreamwork

// ---

// 💡Bitte lest die Hinweise sorgfältig durch, bevor ihr die Endpoints der API ansteuert.

// _________________________________________________________________________


// QUERYSELECTORS - INPUT & OUTPUT & BUTTON
const cityName = document.querySelector("#inputCity");
const stateCode = document.querySelector("#inputCity");
const countryCode = document.querySelector("#inputCity");
const output = document.querySelector(".output")
const grid = document.querySelector(".grid")
const myButton = document.getElementById('.button');


// ENTER KEYUP FUNCTION
cityName.addEventListener('keyup', function(event) {
if (event.keyCode === 13) {
    weatherData();
}
})






// INPUT CITYNAME FUNCTION
const weatherData = (
    latt = 50.935173, lonn= 6.953101
    ) => {
    fetch (
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&appid=ad40156081ccf45f87145fcb49f2d145`)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((allItem) => {
            console.log(allItem);
            let lat = ""
            if (lat === '') {
                lat = latt
            }
            else {
                lat = allItem.lat;
            }
        
            console.log(lat);
            let lon = allItem.lon;
            let name = allItem.name;
            console.log(lon);
            console.log(data);


// WEATHER DETAILS FUNCTION DISPLAY GRID
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=13b6943af84bbae5e56e1975752bc696`)
        .then((res) => res.json())
        .then((weatherData) => {
            console.log(weatherData);
            
// DISPLAY TIMZONE IN RIGHT UTC
            let myDate = Date(300000).toLocaleString().slice(0, 25);
            let mySunrise =  weatherData.sys.sunrise
            let mySunset = weatherData.sys.sunset
            let myTimeZone = weatherData.timezone
            let timeSunrise = new Date((mySunrise + myTimeZone)* 1000).toUTCString().slice(17, -7);
            let timeSunset = new Date((mySunset + myTimeZone)* 1000).toUTCString().slice(17, -7);
            console.log(timeSunrise);
            console.log(timeSunset);
            console.log(myTimeZone);
            console.log(mySunset);
        
            output.innerHTML = `
            <h2>${name}</h2>
            <img src=https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png alt="weather icon">
            <h1>${Math.round(weatherData.main.temp)} °<h1>
            <h5>${weatherData.weather[0].description}</h5>
            <h5>${myDate}</h5>`

            
// PRESSURE UP DOWN FOR SHOW OTHER PIC IN THE GRID TABLE
            let pfeile;
            if (weatherData.main.pressure >= 500 && weatherData.main.pressure <= 999) {
                pfeile = "/assets/bilder/animation-ready/pressure-low.svg";
            } else {
                pfeile = "/assets/bilder/animation-ready/pressure-high.svg";
            }
            console.log(pfeile);

      
// GRID TABELLE DETAILS OUTPUT
        grid.innerHTML = `
         <p>Speed</p>${weatherData.wind.speed} m/s<img src="/assets/bilder/animation-ready/wind.svg" width=60px alt="">
         <p>Pressure</p>${weatherData.main.pressure} hPa <img src="${pfeile}" width=60px alt="">
         <p>Humidity</p>${weatherData.main.humidity} %<img src="/assets/bilder/animation-ready/humidity.svg" width=60px alt="">
         <p>Sunrise</p>${timeSunrise}<img src="/assets/bilder/animation-ready/sunrise.svg" width=60px alt="">
         <p>Sunset</p>${timeSunset}<img src="/assets/bilder/animation-ready/sunset.svg" width=60px alt="">
        `
        console.log();



            })
        })
    })
};

document.addEventListener("DOMContentLoaded", function() {
    weatherData("New York");
});