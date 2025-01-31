document.addEventListener("DOMContentLoaded", () => {
    fetchWeather();
    loadSpotlights();
});

// OpenWeatherMap API: Fetch and display weather data
function fetchWeather() {
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    const city = "Freetown";
    const country = "SL";
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${apiKey}`;

    fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
            const currentWeather = data.list[0]; // First item is current weather
            const forecast = data.list.filter((_, index) => index % 8 === 0).slice(1, 4); // Next 3 days

            const weatherDesc = currentWeather.weather.map(w => capitalizeWords(w.description)).join(", ");
            const temperature = Math.round(currentWeather.main.temp);

            document.getElementById("current-weather").innerHTML = `
                <p><strong>Weather:</strong> ${weatherDesc}</p>
                <p><strong>Temperature:</strong> ${temperature}°C</p>
            `;

            // Forecast Data
            let forecastHTML = "<h3>3-Day Forecast</h3>";
            forecast.forEach(day => {
                const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
                const temp = Math.round(day.main.temp);
                const desc = capitalizeWords(day.weather.map(w => w.description).join(", "));

                forecastHTML += `<p><strong>${date}:</strong> ${temp}°C - ${desc}</p>`;
            });

            document.getElementById("weather-forecast").innerHTML = forecastHTML;
        })
        .catch(error => console.error("Weather Fetch Error:", error));
}

// Function to capitalize each word in a string
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Fetch and display random Gold/Silver members
function loadSpotlights() {
    fetch("chamber-members.json")
        .then(response => response.json())
        .then(data => {
            const eligibleMembers = data.members.filter(member => 
                member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
            );

            const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
            const selectedMembers = shuffled.slice(0, 3); // Select 2 or 3 members

            const spotlightContainer = document.querySelector(".spotlights-container");
            spotlightContainer.innerHTML = "";

            selectedMembers.forEach(member => {
                const memberCard = document.createElement("div");
                memberCard.classList.add("spotlight-item");

                memberCard.innerHTML = `
                    <h3>${member.name}</h3>
                    <img src="${member.logo}" alt="${member.name} Logo">
                    <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                `;

                spotlightContainer.appendChild(memberCard);
            });
        })
        .catch(error => console.error("Spotlight Fetch Error:", error));
}
