import { IEvent } from '../components/common/Event';
import { config } from '../utils/apiKey'
import { IEventsByDate } from './atom';
const WEATHER_API_KEY = config.WEATHER_API_KEY;
let updated = false;
let currentWeather: WeatherSnapshot;
const weatherData: {[key: number]: {main: string, hourly: string[]}} = {};

export type Location = {
    longitude: number
    latitude: number
    name: string
};
export type Weather = {
    temperature: {
        current?: number;
        feel?: number;
        high: number;
        low: number;
    };
    main: string;
};
export type WeatherSnapshot = Weather & {
    temperature: {
        current: number;
        feel: number;
    }
    humidity: number;
    pressure: number;
    wind: {
        direction: string;
        speed: number;
    }
}
export interface IJSONEvent {
    activity: string;
    time: [[number, number, number], [number, number, number]];
    location: string;
    note: string;
    climate: string;
};
export interface IJSONNotification {
    type: string;
    date: string;
    checked: string;
};
export const currentLocation: Location = {
    longitude: 0,
    latitude: 0,
    name: "",
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
export const dateToYearMonthDate = (date: Date): string => `${date.getFullYear()}. ${date.getMonth()+1}. ${date.getDate()}`;
export const dateToYearMonthDateNumber = (date: Date): number => parseInt(`${date.getFullYear()}${String(date.getMonth()+1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`);
export const dateToHourMinute = (date: Date): string => `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;   
export const yearMonthDateToDate = (yearMonthDate: string): Date => new Date(parseInt(yearMonthDate.split(". ")[0]), parseInt(yearMonthDate.split(". ")[1])-1, parseInt(yearMonthDate.split(". ")[2]));
export const yearMonthDateHourMinuteToDate = (yearMonthDate: string, hour: number, minute: number): Date => new Date(parseInt(yearMonthDate.split(". ")[0]), parseInt(yearMonthDate.split(". ")[1])-1, parseInt(yearMonthDate.split(". ")[2]), hour, minute);
export const numberToMonthDateYear = (date: number) => {
    const monthText = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthText[Math.floor(date/100)%100-1]} ${date%100}, ${Math.floor(date/10000)}`;
};
export const isSameDate = (date1: Date, date2: Date): boolean => date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
export const getCurrentLocation = (): Location | Promise<Location> => {
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
export const getCurrentWeather = (): WeatherSnapshot | Promise<WeatherSnapshot> => {
    const location = getCurrentLocation();
    if (location instanceof Promise) {
        return location.then((location) => fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${WEATHER_API_KEY}&units=metric`))
        .then((response) => response.json())
        .then((json) => {
            currentWeather = {
                temperature: {
                    current: parseInt(json.main.temp.toFixed()),
                    feel: parseInt(json.main.feels_like.toFixed()),
                    high: 0,
                    low: 0,
                },
                humidity: json.main.humidity,
                pressure: json.main.pressure,
                main: json.weather[0].main,
                wind: {
                    direction: windDirection(json.wind.deg),
                    speed: parseInt(json.wind.speed.toFixed()),
                }
            }
            return location;
        })
        .then((location) => fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${location.latitude}&lon=${location.longitude}&appid=${WEATHER_API_KEY}&cnt=1&units=metric`))
        .then((response) => response.json())
        .then((json) => {
            currentWeather = {...currentWeather, temperature: {...currentWeather.temperature, high: parseInt(json.list[0].temp.max.toFixed()), low: parseInt(json.list[0].temp.min.toFixed())}};
            updated = true;
            return currentWeather;
        })
    }
    else return currentWeather;
};
/*
export const getPrevWeather = (start: Date, end: Date) => {
    const ret: Weather[] = [];
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
export const getNextWeather = (cnt: number): Promise<Weather[]> => {
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
*/

export const getDateWeather = (date: Date): string | Promise<Weather> => {
    if (isSameDate(new Date(), date)) {
        const currentWeather = getCurrentWeather();
        if (currentWeather instanceof Promise) return currentWeather;
        else return currentWeather.main;
    }
    if (isSameDate(new Date(), new Date(date.getFullYear(), date.getMonth(), date.getDate()-1))) return "Rain";
    if (dateToYearMonthDateNumber(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+7)) < dateToYearMonthDateNumber(date)) {
        return "No";
    }

    if (weatherData[dateToYearMonthDateNumber(date)]) return weatherData[dateToYearMonthDateNumber(date)].main;
    else {
        const value = Math.random();
        let weather: string;
        if (value < 0.5) weather = "Clear";
        else if (value < 0.8) weather = "Clouds";
        else {
            if (date.getMonth() < 2) weather = "Snow";
            else weather = "Rain";
        }
        weatherData[dateToYearMonthDateNumber(date)] = {main: weather, hourly: []};
        return weather;
    }
}

export const getHourlyWeather = (date: Date) => {
    const weather = getDateWeather(date) as string;
    switch (weather) {
        case "Clear": return ["Clear", "Clear", "Clear", "Clouds", "Clouds", "Clouds", "Clear", "Clear", "Clear", "Clear", "Clear", "Clear",
                              "Clear", "Clear", "Clear", "Clear", "Clear", "Clear", "Clear", "Clear", "Clouds", "Clouds", "Clear", "Clear",];
        case "Clouds": return ["Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", 
                               "Clouds", "Clear", "Clear", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds",];
        case "Snow": return ["Snow", "Snow", "Snow", "Snow", "Snow", "Snow", "Clouds", "Clouds", "Clouds", "Clouds", "Snow", "Snow", 
                             "Snow", "Snow", "Snow", "Snow", "Snow", "Snow", "Snow", "Snow", "Snow", "Snow", "Snow", "Snow",];
        case "Rain": return ["Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", 
                             "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Clouds", "Clouds", "Clouds", "Clouds",];
        default: return [];
    }
}

export const eventsToEventsByDate = (events: IEvent[]) => {
    const eventsByDate: IEventsByDate = {};
    const nextDate = (date: number): number => dateToYearMonthDateNumber(new Date(Math.floor(date/10000), Math.floor(date/100)%100 - 1, date%100 + 1))

    events.forEach((event, idx) => {
        if (isSameDate(event.time[0], event.time[1])) {
            if (!eventsByDate[dateToYearMonthDateNumber(event.time[0])]) eventsByDate[dateToYearMonthDateNumber(event.time[0])] = [];
            eventsByDate[dateToYearMonthDateNumber(event.time[0])].push([idx, "NO"]);
        }
        else {
            for(let i: number = dateToYearMonthDateNumber(event.time[0]); 
                    i<=dateToYearMonthDateNumber(event.time[1]); 
                    i = nextDate(i)) {
                if (!eventsByDate[i]) eventsByDate[i] = [];
                if (i === dateToYearMonthDateNumber(event.time[0])) eventsByDate[i].push([idx, "START"]);
                else if (i === dateToYearMonthDateNumber(event.time[1])) eventsByDate[i].push([idx, "END"]);
                else eventsByDate[i].push([idx, "ALL"]);
            }
        }
    });
    return eventsByDate;
}