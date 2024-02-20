import { config } from '../utils/apiKey'
const WEATHER_API_KEY = config.WEATHER_API_KEY;

type Location = {
    longitude: number
    latitude: number
    name: string
};

type Weather = {
    temperature: {
        current?: string;
        feel?: string;
        high: string;
        low: string;
    };
    humidity: number;
    pressure: number;
    main: string;
    wind?: {
        direction: string;
        speed: string;
    };
};

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
    wind: {
        direction: "",
        speed: "",
    },
};

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
};

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
};

const getCurrentWeather = (): Weather | Promise<Weather> => {
    const location = getCurrentLocation();
    if (location instanceof Promise) {
        return location.then((location) => {
            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${WEATHER_API_KEY}&units=metric`);
        })
        .then((response) => response.json())
        .then((json) => {
            if (todayWeather.temperature?.current !== undefined) {
                todayWeather.temperature.current = json.main.temp.toFixed();
            }
            if (todayWeather.temperature?.feel !== undefined) {
                todayWeather.temperature.feel = json.main.feels_like.toFixed();
            }
            todayWeather.humidity = json.main.humidity;
            todayWeather.pressure = json.main.pressure;
            todayWeather.main = json.weather[0].main;
            if (todayWeather.wind !== undefined) {
                todayWeather.wind.direction = windDirection(json.wind.deg)
                todayWeather.wind.speed = json.wind.speed.toFixed();
            }
            return location;
        })
        .then((location) => {
            return fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${location.latitude}&lon=${location.longitude}&appid=${WEATHER_API_KEY}&cnt=1&units=metric`);
        })
        .then((response) => response.json())
        .then((json) => {
            todayWeather.temperature.high = json.list[0].temp.max.toFixed();
            todayWeather.temperature.low = json.list[0].temp.min.toFixed();
            updated = true;
            return todayWeather;
        })
    }
    else return todayWeather;
};

const getPrevWeather = (start: Date, end: Date) => {
    const ret: Weather[] = [];
    // const location = getCurrentLocation() as Location;
    start = new Date(2024, 1, 16);
    end = new Date(2024, 1, 18);
    console.log(start, end, start.getTime()/1000, end.getTime()/1000)
    const location = {
        latitude: 37.5356,
        longitude: 126.6389,
    }
    return fetch(`https://history.openweathermap.org/data/2.5/history/city?lat=${location.latitude}&lon=${location.longitude}&type=date&start=${start.getTime()/1000}&cnt=200&appid=${WEATHER_API_KEY}&units=metric`)
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        for (let i: number = 0; i<json.list.length; i++) {
            const element = json.list[i].main;
            const tmpWeather: Weather = {
                temperature: {
                    high: element.temp_max.toFixed(),
                    low: element.temp_min.toFixed(),
                },
                humidity: element.humidity,
                pressure: element.pressure,
                main: json.list[i].weather[0].main,
            };
            ret.push(tmpWeather);
        }
        console.log(ret);
    })
};

const getNextWeather = (cnt: number): Promise<Weather[]> => {
    const ret: Weather[] = [];
    if (cnt > 30) cnt = 30;
    // const location = getCurrentLocation() as Location;
    const location = {
        latitude: 37.5356,
        longitude: 126.6389,
    }
    return fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${location.latitude}&lon=${location.longitude}&appid=${WEATHER_API_KEY}&0&cnt=${cnt}&units=metric`)
    .then((response) => response.json())
    .then((json) => {
        for (let i: number = 0; i<json.list.length; i++) {
            const element = json.list[i];
            const tmpWeather: Weather = {
                temperature: {
                    high: element.temp.max.toFixed(),
                    low: element.temp.max.toFixed(),
                },
                humidity: element.humidity,
                pressure: element.pressure,
                main: element.weather[0].main,
            };
            ret.push(tmpWeather);
        }
        console.log(ret);
        return ret;
    })
};

const getMonthlyWeather = (year: number, month: number) => {
    const now = new Date();
    if (year === now.getFullYear() && month === now.getMonth()) {

    }
    else if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth())) {

    }
    else {

    }
};

export { getCurrentLocation, getCurrentWeather, getMonthlyWeather };
export type { Location, Weather };