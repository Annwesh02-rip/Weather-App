async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "ea2359b2ef4075d33be7be7670ab0e5b"; // <-- Replace with your own API key
  
    if (!city) {
      alert("Please enter a city name!");
      return;
    }
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.cod === 200) {
        const iconCode = data.weather[0].icon;  // Get the icon code (e.g., '02d')
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;  // Full URL to the icon
  
        document.getElementById("weatherResult").innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
          <p><strong>Weather:</strong> ${data.weather[0].description}</p>
          <img src="${iconUrl}" alt="${data.weather[0].description}" />
        `;
      } else {
        document.getElementById("weatherResult").innerHTML = `<p>City not found!</p>`;
      }
    } catch (error) {
      document.getElementById("weatherResult").innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }
  