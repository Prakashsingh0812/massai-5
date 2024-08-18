const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

// Function to fetch weather data for a city
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://freetestapi.com/api/v1/weathers/1`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

// Function to display weather data
function displayWeather(data) {
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weatherDescription');
    
    cityName.textContent = data.name;
    temperature.textContent = `Temp: ${(data.main.temp - 273.15).toFixed(2)}°C`;
    weatherDescription.textContent = data.weather[0].description;
}

// Debounce implementation for search input
let debounceTimer;
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const city = searchInput.value;
        if (city) {
            fetchWeather(city).then(displayWeather);
        }
    }, 500); // 500ms debounce time
});

// Function to fetch 30-day weather forecast data
async function fetchForecast(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=30&appid=${apiKey}`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

// Function to toggle between infinite scrolling and pagination
let useInfiniteScrolling = true;

function toggleScrollingMode() {
    useInfiniteScrolling = !useInfiniteScrolling;
    // Re-render forecast data with the chosen mode
    console.log("Toggled Scrolling Mode: " + (useInfiniteScrolling ? "Infinite Scrolling" : "Pagination"));
}

// Function to display forecast data based on the selected mode
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; // Clear previous content

    if (useInfiniteScrolling) {
        // Implement infinite scrolling logic
    } else {
        // Implement pagination logic
    }
}

// Function to save user preferences to localStorage
function savePreferences(theme, recentSearches) {
    localStorage.setItem('theme', theme);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
}

// Function to load user preferences from localStorage
function loadPreferences() {
    const theme = localStorage.getItem('theme') || 'light';
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    
    // Apply theme
    document.body.classList.add(theme);
    
    // Populate recent searches (if applicable)
}

// Load preferences on page load
document.addEventListener('DOMContentLoaded', loadPreferences);

// Toggle theme between light and dark
const themeToggleButton = document.getElementById('themeToggle');
themeToggleButton.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('dark');
    savePreferences(newTheme, []); // Update preferences (recent searches can be added if needed)
});
