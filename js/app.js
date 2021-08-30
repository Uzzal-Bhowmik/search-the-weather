const searchField = document.getElementById('search-field');

document.getElementById('search-btn').addEventListener('click', function () {
    if (searchField.value != '') {

        // calling spinner 
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';
        // calling weather api using city name 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchField.value}&units=metric&appid=2b334becae44bdcd12f3c9bf920b53d9`)
            .then(res => {
                hideSpinner();
                return res.json()
            })
            .then(weatherData => displayWeather(weatherData))

        // clearing search field 
        searchField.value = ''
    }
    else {
        displayError(1);
    }
});


const displayWeather = (weatherInfo) => {

    if (weatherInfo.cod == '404') {
        const weatherInfoCon = document.getElementById('weather-info-container');
        weatherInfoCon.textContent = '';
        displayError(1);
    }
    else {

        const weatherInfoCon = document.getElementById('weather-info-container');
        displayError(0)
        weatherInfoCon.textContent = '';

        const weather = document.createElement('div')
        weather.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png" alt="">
        <h1 id='place-name'>${weatherInfo.name}</h1>
        <pre>Country: ${weatherInfo.sys.country}</pre>
        <h3>${weatherInfo.main.temp}&deg;c</h3>
        <pre>Max: ${weatherInfo.main.temp_max}&deg;c &Tab; Min: ${weatherInfo.main.temp_min}&deg;c &Tab; Humidity:${weatherInfo.main.humidity}%</pre>
        <h5>${weatherInfo.weather[0].main}</h5>
        <button onclick="loadTime()" class="btn btn-danger mt-3">Last Updated</button>
        <div id='time-con'>
        </div>
    `;

        weatherInfoCon.appendChild(weather);
    }
};

// Loading time information when time button is clicked 
function loadTime() {
    const timePlace = document.getElementById('place-name');
    fetch(`https://api.ipgeolocation.io/timezone?apiKey=bb457660a4c742e4878a63e0822723ec&location=${timePlace.innerText}`)
        .then(res => res.json())
        .then(data => displayTime(data))
}

const displayTime = (time) => {
    const container = document.getElementById('time-con');
    container.textContent = '';
    const timeToAdd = document.createElement('p');
    timeToAdd.innerHTML = `
    <br>
    <span class='fw-bold bg-white text-dark p-2 mt-4 border border-info rounded'>at ${time.time_12} (Local Time)</span>
    `;
    container.appendChild(timeToAdd);
}

// error showing function 
function displayError(id) {
    const errorCon = document.getElementById('error-con');
    errorCon.textContent = '';
    if (id == 1) {
        errorCon.innerHTML = `
    <h1 class="text-white">Nothing was found :(</h1>
    `;
    }
};

function hideSpinner() {
    document.getElementById('spinner')
        .style.display = 'none';
}