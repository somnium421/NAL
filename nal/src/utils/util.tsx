import { config } from '../utils/apiKey'
const WEATHER_API_KEY = config.WEATHER_API_KEY;

type Location = {
    longitude: number
    latitude: number
    name: string
}

type Temperature = {
    current?: string;
    feel?: string;
    high: string;
    low: string;
}

type Weather = {
    temperature: Temperature;
    humidity: number;
    pressure: number;
    main: string;
    wind: [string, string];
}

const currentLocation: Location = {
    longitude: 0,
    latitude: 0,
    name: "",
};

const todayWeather: Weather = {
    temperature: {
        current: "",
        feel: "",
        high: "",
        low: "",
    },
    humidity: 0,
    pressure: 0,
    main: "",
    wind: ["", ""],
}

const windDirection = (degree: number): string => {
    if (degree > 337.5) return "N";
    if (degree > 292.5) return "NW";
    if (degree > 247.5) return "W";
    if (degree > 202.5) return "SW";
    if (degree > 157.5) return "S";
    if (degree > 112.5) return "SE";
    if (degree > 67.5) return "E";
    if (degree > 22.5) return "NE";
    else return "N"
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
            if (todayWeather.temperature?.current !== undefined) {
                todayWeather.temperature.current = json.main.temp.toFixed();
            }
            if (todayWeather.temperature?.feel !== undefined) {
                todayWeather.temperature.feel = json.main.feels_like.toFixed();
            }
            todayWeather.humidity = json.main.humidity;
            todayWeather.pressure = json.main.pressure;
            todayWeather.main = json.weather[0].main;
            todayWeather.wind = [windDirection(json.wind.deg), json.wind.speed.toFixed()];
            return location;
        })
        .then((location) => {
            return fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${location.latitude}&lon=${location.longitude}&appid=${WEATHER_API_KEY}&cnt=1&units=metric`);
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            todayWeather.temperature.high = json.list[0].temp.max.toFixed();
            todayWeather.temperature.low = json.list[0].temp.min.toFixed();
            updated = true;
            console.log(todayWeather);
            return todayWeather;
        })
    }
    else return todayWeather;
}

export { getCurrentLocation, getCurrentWeather };
export type { Location, Temperature, Weather };