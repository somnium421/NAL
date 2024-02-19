import { config } from '../utils/apiKey'
const WEATHER_API_KEY = config.WEATHER_API_KEY;

type Location = {
    longitude: number
    latitude: number
    name: string
}

type Weather = {
    current: string;
    high: string;
    low: string;
}

const currentLocation: Location = {
    longitude: 0,
    latitude: 0,
    name: "",
};

const currentWeather: Weather = {
    current: '',
    high: '',
    low: '',
}

let updated = false;

const getCurrentLocation = (): Location | Promise<Location> => {
    if (updated) return currentLocation;
    return new Promise((res: (value: GeolocationPosition)=>void) =>
        navigator.geolocation.getCurrentPosition(res))
    .then((pos) => {
        currentLocation.longitude = pos.coords.longitude;
        currentLocation.latitude = pos.coords.latitude;
        return fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&limit=1&appid=${WEATHER_API_KEY}`)
    })
    .then((response) => response.json())
    .then((json) => {
        currentLocation.name = json[0].name;
        return currentLocation;
    });
}

const getCurrentWeather = (): Weather | Promise<Weather> => {
    const location = getCurrentLocation();
    if (location instanceof Promise) {
        return location.then((location) => {
            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${WEATHER_API_KEY}&units=metric`);
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            currentWeather.current = json.main.temp.toFixed();
            currentWeather.high = json.main.temp_max.toFixed();
            currentWeather.low = json.main.temp_min.toFixed();
            updated = true;
            return currentWeather;
        });
    }
    else return currentWeather;
}

// const getCurrentTemp = () => {
//     console.log(location);
    
//     temperature.current = "23";
//     temperature.high = "29";
//     temperature.low = "16"
// }

export { getCurrentLocation, getCurrentWeather };
export type { Location, Weather };