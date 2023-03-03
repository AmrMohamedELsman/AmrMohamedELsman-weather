
/* toDayCard */
let toDayCard = document.getElementById("toDayCard");
let Day = document.getElementById("Day");
let dayDate = document.getElementById("dayDate");
let locaCity = document.getElementById("locaCity");
let numDegre = document.getElementById("numDegre");
let iconDegre = document.getElementById("iconDegre");
let weatherState = document.getElementById("weatherState");
let rain = document.getElementById("rain");
let wind = document.getElementById("wind");
let directionWind = document.getElementById("directionWind");
let searchBar = document.getElementById("searchBar");
let btnSerch = document.getElementById("btnSerch");
let eserch = document.getElementById("eserch")
let btne = document.getElementById("btne")

/* next day card */
let nextDay = document.getElementsByClassName("nextDay");
let nextDayIcon = document.getElementsByClassName("nextDayIcon");
let nextDayMaxDegre = document.getElementsByClassName("nextDayMaxDegre");
let nextDayMinDegre = document.getElementsByClassName("nextDayMinDegre");
let nextDayState = document.getElementsByClassName("nextDayState");
let nextDayRain = document.getElementsByClassName("nextDayRain");
let nextDayWind = document.getElementsByClassName("nextDayWind");
let nextDaycompass = document.getElementsByClassName("nextDaycompass");
let apiRespons;
let responsData;
weekDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
monthName=["January","February","March","April","May","June","July","August","September","October","November","December"];

async function getApiData(currentCity='cairo'){
    apiRespons =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=01b80877fe0e4d1582c25745230203&q=${currentCity}&days=3`);
    responsData = await apiRespons.json()
    displayToDayData();
    displayNextDayData();
}
getApiData()


function displayToDayData(){
    let date = new Date()
    Day.innerHTML=weekDays[date.getDay()];
    dayDate.innerHTML=`${date.getDate()} ${monthName[date.getMonth()]}`
    locaCity.innerHTML= responsData.location.name;
    numDegre.innerHTML=responsData.current.temp_c;
    iconDegre.setAttribute("src",`https:${responsData.current.condition.icon}`)
    weatherState.innerHTML=responsData.current.condition.text;
    rain.innerHTML=responsData.current.humidity;
    wind.innerHTML=responsData.current.wind_kph;
    directionWind.innerHTML=responsData.current.wind_dir;
}


function displayNextDayData(){
    for(let i = 0;i< nextDay.length; i++){
        nextDay[i].innerHTML= weekDays[new Date(responsData.forecast.forecastday[i+1].date).getDay()];
        nextDayIcon[i].setAttribute("src",`https:${responsData.forecast.forecastday[i+1].day.condition.icon}`)
        nextDayMaxDegre[i].innerHTML=responsData.forecast.forecastday[i+1].day.maxtemp_c;
        nextDayMinDegre[i].innerHTML=responsData.forecast.forecastday[i+1].day.mintemp_c;
        nextDayState[i].innerHTML=responsData.forecast.forecastday[i+1].day.condition.text;
        nextDayRain[i].innerHTML=responsData.forecast.forecastday[i+1].day.daily_chance_of_rain;
        nextDayWind[i].innerHTML=responsData.forecast.forecastday[i+1].day.maxwind_kph;
        nextDaycompass[i].innerHTML=responsData.current.wind_dir;
    }
}

searchBar.addEventListener("keyup", function(){
    currentCity=searchBar.value;
    getApiData(currentCity)
})

btnSerch.addEventListener("click",function(){
    searchBar.value = "";
})
btne.addEventListener("click",function(){
    eserch.value = "";
})