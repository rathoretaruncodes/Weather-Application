const API_KEY = `ab9200e5e3aab3ea9f368af15d11fbd4`;
const form = document.querySelector('form');
const search = document.querySelector('#search');
const weather = document.querySelector('#weatherInformation');

const getWeather = async(city) => {
    weather.innerHTML = `<h2> Wait </h2>`;
    //units=metric enables the temp in celsius scale.
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return showWeather(data);
}
const showWeather = (data) => {
    // Makes the data visible on the console.
    console.log(data);
    if(data.cod == "404") {
        weather.innerHTML = `<h2> City Not Found`;
        return;
    }
    weather.innerHTML = `
    <div class="weather">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        <h4>${data.weather[0].main}</h4>
    </div>
    <div class="weather">
        <h4>Temperature : ${data.main.temp}°C</h4>
        <h4>Pressure : ${data.main.pressure}mb</h4>
        <h4>Humidity : ${data.main.humidity}%</h4>
        <h4>Sunrise : ${data.sys.sunrise}</h4>
        <h4>Sunset : ${data.sys.sunset}</h4>
        <h4>Wind Speed : ${data.wind.speed}</h4>
        <h4>Latitude : ${data.coord.lat}</h4>
        <h4>Longitude : ${data.coord.lon}</h4>
    </div>`;
}
form.addEventListener('submit', (event) =>{
    getWeather(search.value);
    event.preventDefault(); //Prevents the default behaviour of forms, i.e., reload on submission
});