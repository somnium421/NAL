import { IEvent } from '../components/common/Event';
import { config } from '../utils/apiKey'
import { IEventsByDate, INotification } from './atom';
const WEATHER_API_KEY = config.WEATHER_API_KEY;
let updated = false;
let currentWeather: WeatherSnapshot;
const weatherData: {[key: number]: DateWeather} = {};

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
export type DateWeather = {
    main: string;
    hourly: string[];
}
export interface IJSONEvent {
    activity: string;
    time: [[number, number, number], [number, number, number]];
    location: string;
    note: string;
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

export const getDateWeather = (date: Date): DateWeather | Promise<Weather> => {
    // if (isSameDate(new Date(), date)) {
    //     const currentWeather = getCurrentWeather();
    //     if (currentWeather instanceof Promise) return currentWeather;
    //     else return currentWeather.main;
    // }
    if (weatherData[dateToYearMonthDateNumber(date)]) return weatherData[dateToYearMonthDateNumber(date)];
    else return makeDateWeather(date);
}

export const makeDateWeather = (date: Date): DateWeather => {
    let value = Math.random();
    if (isSameDate(new Date(), new Date(date.getFullYear(), date.getMonth(), date.getDate()-1))) value = 1;

    if (dateToYearMonthDateNumber(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+7)) < dateToYearMonthDateNumber(date)) weatherData[dateToYearMonthDateNumber(date)] = {main: "No", hourly: []};
    else if (value < 0.5) weatherData[dateToYearMonthDateNumber(date)] = {main: "Clear", hourly: ["Clear", "Clear", "Clear", "Clouds", "Clouds", "Clouds", "Clear", "Clear", "Clear", "Clear", "Clear", "Clear",
                                                                                             "Clear", "Clear", "Clear", "Clear", "Clear", "Clear", "Clear", "Clear", "Clouds", "Clouds", "Clear", "Clear",]};
    else if (value < 0.8) weatherData[dateToYearMonthDateNumber(date)] = {main: "Clouds", hourly: ["Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", 
                                                                                                   "Clouds", "Clear", "Clear", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds", "Clouds",]};
    else {
        if (date.getMonth() < 2) weatherData[dateToYearMonthDateNumber(date)] = {main: "Snow", hourly: ["Snow", "Snow", "Snow", "Snow", "Snow", "Snow", "Clouds", "Clouds", "Clouds", "Clouds", "Snow", "Snow", 
                                                                                                        "Snow", "Snow", "Snow", "Snow", "Snow", "Snow", "Snow", "Snow", "Snow", "Snow", "Snow", "Snow",]};
        else weatherData[dateToYearMonthDateNumber(date)] = {main: "Rain", hourly: ["Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", 
                                                                                    "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Rain", "Clouds", "Clouds", "Clouds", "Clouds",]};
    }
    return weatherData[dateToYearMonthDateNumber(date)];
};
export const getHourlyWeather = (date: Date) => {
};
export const checkEventsWeather = (events: IEvent[]) => {
    return events.map((event) => {
        const eventWeather = getEventWeather(event.time[0], event.time[1]);
        return {
            ...event, modify: eventWeather,
        }
    });
}
export const eventsToEventsByDate = (events: IEvent[]) => {
    const eventsByDate: IEventsByDate = {};
    
    events.forEach((event, idx) => {
        if (isSameDate(event.time[0], event.time[1])) {
            if (!eventsByDate[dateToYearMonthDateNumber(event.time[0])]) eventsByDate[dateToYearMonthDateNumber(event.time[0])] = [];
            eventsByDate[dateToYearMonthDateNumber(event.time[0])].push({idx, timeMode: "NO"});
        }
        else {
            for(let date = event.time[0]; date <= event.time[1]; date = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)) {
                if (!eventsByDate[dateToYearMonthDateNumber(date)]) eventsByDate[dateToYearMonthDateNumber(date)] = [];

                if (isSameDate(date, event.time[0])) eventsByDate[dateToYearMonthDateNumber(date)].push({idx, timeMode: "START"});
                else if (isSameDate(date, event.time[1])) eventsByDate[dateToYearMonthDateNumber(date)].push({idx, timeMode: "END"});
                else eventsByDate[dateToYearMonthDateNumber(date)].push({idx, timeMode: "ALL"});
            }
        }
    });
    return eventsByDate;
};
export const getEventWeather = (startsTime: Date, endsTime: Date): string => {
    for (let date = new Date(startsTime.getFullYear(), startsTime.getMonth(), startsTime.getDate());
         date <= endsTime; date = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)) {
        let dateWeather = getDateWeather(date) as DateWeather;
        if (isSameDate(date, startsTime)) {
            const hourly = dateWeather.hourly.slice(startsTime.getHours());
            if (hourly.includes("Rain")) return "Rain";
            if (hourly.includes("Snow")) return "Snow";
        }
        else if (isSameDate(date, endsTime)) {
            const hourly = dateWeather.hourly.slice(0, endsTime.getHours());
            if (hourly.includes("Rain")) return "Rain";
            if (hourly.includes("Snow")) return "Snow";
        }
        else {
            const hourly = dateWeather.hourly;
            if (hourly.includes("Rain")) return "Rain";
            if (hourly.includes("Snow")) return "Snow";
        }
    }
    return "No";    
};

export const eventsToNotification = (events: IEvent[]): INotification[] => {
    const tmp: INotification[] = [];
    events.forEach((event, idx) => {
        if (event.modify !== "No") {
            tmp.push({
                type: "MODIFY",
                checked: false,
                eventIdx: idx,
                modifyReason: event.modify,
            })
        }
    });
    return tmp;
}