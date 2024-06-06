document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weather-form');
    const weatherResult = document.getElementById('weather-result');

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = document.getElementById('city-input').value;
        getWeather(city);
    });

    function getWeather(city) {
        const apiKey = '9ffb80031b142175f1ea0efdb135543c'; // Provided API key
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.main && data.weather) {
                    weatherResult.innerHTML = `
                        <h3>${data.name}</h3>
                        <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</p>
                        <p>Weather: ${data.weather[0].description}</p>
                    `;
                } else {
                    throw new Error('Incomplete data received');
                }
            })
            .catch(error => {
                weatherResult.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
                console.error('Error:', error);
            });
    }
});