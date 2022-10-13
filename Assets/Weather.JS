
var searchHistory =[];
var weatherApiKey = "c31022cc13458b2b205f3f52369f4ecc";
var rootUrl = "https://api.openweathermap.org";

var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var todayContainer = document.querySelector("#today");
var forecastContainer = document.querySelector("#forecast");
var searchHistoryContainer = document.querySelector("#history");

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function renderSearch(){
  searchHistoryContainer.innerHTML = "";
  for(var i = searchHistory.length - 1; i >= 0; i--) {
    var btn = document.createElement("button");
    btn.setAttribute("type","button"); 
    btn.setAttribute("aria-controls", "today forecast");
    btn.classList.add("history-btn", "btn-history");
    btn.setAttribute("data-search", searchHistory[i]);
    btn.textContent = searchHistory[i];
    searchHistoryContainer.append(btn)
  }
};

function setHistory(search){
  if(searchHistory.indexOf(search)!== -1){
    return;
  }
   searchHistory.push(search);
   localStorage.setItem("search-history", JSON.stringify(searchHistory));
   renderSearch()
}

function getHistory(){
  var storedHistory = localStorage.getItem("search-history");
  if(storedHistory){
    searchHistory = JSON.parse(storedHistory);
  }
    renderSearch()
}


function fetchWeather(location) {
  var { lat } = location;
  var { lon } = location;
  var city = location.name;

  var apiUrl = `${rootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=c31022cc13458b2b205f3f52369f4ecc`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderItems(city, data);
    })
    console.log(apiUrl)
    .catch(function (err) {
      console.error(err);
    });
} 

// function fetchCoords(search) {
//   var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;

//   fetch(apiUrl)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       if (!data[0]) {
//         alert('Location not found');
//       } else {
//         appendToHistory(search);
//         fetchWeather(data[0]);
        
//       }
//     })
//     .catch(function (err) {
//       console.error(err);
//     });
// }



// Tried Code//

//------------------------------------------------------------------------------------
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'ddebcb2ceamsh1919faa5a84d055p10d063jsneee465e9522e',
// 		'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
// 	}
// };

// fetch('https://open-weather13.p.rapidapi.com/city/New York', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


// fetch(requestUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log("Weather Time");
//     for (var i = 0; i < data.length; i++) {
//       console.log(data[i].requestUrl);
//     }
//   });

//fetch ("api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=c31022cc13458b2b205f3f52369f4ecc") 
// .then(response => {
//   return response.json();
// }) 
//  .then(function (data) {
//     console.log('Want to know the Forecast');
//     console.log(data);
//  
// $.ajax({
//   url:requestUrl,
//   method: 'GET',
// }).then(function (response) {
//   console.log('Weather in Your Area is');
//   console.log(response);
// });
