// Get user's current location (latitude & longitude) and send it to the request function
function getLocation() {
  navigator.geolocation.getCurrentPosition(
    function (pos) {
      const lat = pos.coords.latitude;
      const long = pos.coords.longitude;
        request(lat, long , undefined); 
      },
  )

}

// Get the country name from the input field and send it to the request function
function getCountryName(){
  var country = document.querySelector(".location").value ; 
  if(country){
    request( undefined, undefined,  country) ;
  }
}

// Fetch weather data using city name or coordinates, then display it
async function request (lat , long , name){
  
  var url ; 

  // If a country/city name is provided
  if(name){
    url = "https://api.weatherapi.com/v1/forecast.json?key=5e1858a113a646d9947174450252510&q="+ name+"&days=3" ;
  }

  // If latitude and longitude are provided
  else if (long && lat){
    url = "https://api.weatherapi.com/v1/forecast.json?key=5e1858a113a646d9947174450252510&q="+lat+","+long+"&days=3" ;
  }

  try{
    
    // Fetch the weather data
    var respons = await fetch(url) ;
    var data = await respons.json() ;

    // Extract and display data
    extractValuesOfData_and_showIt(data) ;

  }catch(error){
    
    // Ignore any errors
    return ;
  }
}

// Extract weather data from API response and display it on the page
function extractValuesOfData_and_showIt (data){
  
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // ===== TODAY =====
  var todaycity = data.location.name ;
  var fullDate = new Date(data.forecast.forecastday[0].date) 
  var todayday = days[fullDate.getDay()];
  var todaydate = fullDate.toDateString();
  var todaycondition = data.forecast.forecastday[0].day.condition.text ;
  var todaysempol = data.forecast.forecastday[0].day.condition.icon ;
  var todaytemperature = data.current.feelslike_c ;
  var Windspeed = data.current.wind_kph ;
  var Winddirection = data.current.wind_dir ;
  var windchill = data.current.windchill_c ;


  // ===== TOMORROW =====
  var tomorrowday = days[new Date(data.forecast.forecastday[1].date).getDay()] ;
  var tomorrowsempol = data.forecast.forecastday[1].day.condition.icon ;
  var tomorrowHightemperature = data.forecast.forecastday[1].day.maxtemp_c ;
  var tomorrowLowtemperature = data.forecast.forecastday[1].day.avgtemp_c ;
  var tomorrowcondition = data.forecast.forecastday[1].day.condition.text ;


  // ===== AFTER TOMORROW =====
  var aftertomorrowday = days[new Date(data.forecast.forecastday[2].date).getDay()] ;
  var aftertomorrowsempol = data.forecast.forecastday[2].day.condition.icon  ;
  var aftertomorrowHightemperature = data.forecast.forecastday[2].day.maxtemp_c ;
  var aftertomorrowLowtemperature = data.forecast.forecastday[2].day.avgtemp_c ; 
  var aftertomorrowcondition = data.forecast.forecastday[2].day.condition.text ;


  // ===== DISPLAY TODAY'S DATA =====
  document.querySelector("#today-day").innerHTML = todayday ;
  document.querySelector("#today-date").innerHTML = todaydate ;
  document.querySelector("#today-city").innerHTML = todaycity ;
  document.querySelector("#today-temperature").innerHTML = todaytemperature+"°C" ;
  document.querySelector("#today-sempol").src = todaysempol ;
  document.querySelector("#today-condition").innerHTML = todaycondition ;
  document.querySelector("#Wind-speed").innerHTML = Windspeed+"km/h" ;
  document.querySelector("#Wind-direction").innerHTML = Winddirection ;
  document.querySelector("#windchill").innerHTML = windchill+"%" ;

  // ===== DISPLAY TOMORROW'S DATA =====
  document.querySelector("#tomorrow-day").innerHTML = tomorrowday ;
  document.querySelector("#tomorrow-sempol").src = tomorrowsempol ;
  document.querySelector("#tomorrow-High-temperature").innerHTML = tomorrowHightemperature+"°C" ;
  document.querySelector("#tomorrow-Low-temperature").innerHTML = tomorrowLowtemperature+"°" ;
  document.querySelector("#tomorrow-condition").innerHTML = tomorrowcondition ;


  // ===== DISPLAY AFTER TOMORROW'S DATA =====
  document.querySelector("#after-tomorrow-day").innerHTML = aftertomorrowday ;
  document.querySelector("#after-tomorrow-sempol").src = aftertomorrowsempol ;
  document.querySelector("#after-tomorrow-High-temperature").innerHTML = aftertomorrowHightemperature+"°C" ;
  document.querySelector("#after-tomorrow-Low-temperature").innerHTML = aftertomorrowLowtemperature+"°" ;
  document.querySelector("#after-tomorrow-condition").innerHTML = aftertomorrowcondition ;

}

// Run getCountryName() whenever the user types in the location input
document.querySelector(".location").addEventListener("input" , getCountryName )

// Run getLocation() when the "Detect location" button is clicked
document.querySelector(".Detect-location").addEventListener("click" , getLocation )



// When the page loads, getLocation() is called to detect the user's coordinates
// getLocation() calls request() to fetch the weather data from the API
// request() then passes the response to extractValuesOfData_and_showIt()
// extractValuesOfData_and_showIt() extracts and displays the weather information on the page
getLocation()