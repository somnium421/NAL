import { IEvent } from '../components/common/Event';
import { config } from '../utils/apiKey'
import { IEventsByDate } from './atom';
const WEATHER_API_KEY = config.WEATHER_API_KEY;

export type Location = {
    longitude: number
    latitude: number
    name: string
};

export type Weather = {
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

export interface IJSONEvent {
    activity: string;
    time: [[string, string, string], [string, string, string]];
    location: string;
    note: string;
    climate: string;
}

export const currentLocation: Location = {
    longitude: 0,
    latitude: 0,
    name: "",
};

export const todayWeather: Weather = {
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

export const windDirection = (degree: number): string => {
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

export const getCurrentWeather = (): Weather | Promise<Weather> => {
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

export const getPrevWeather = (start: Date, end: Date) => {
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

export const getMonthlyWeather = (year: number, month: number) => {
    const now = new Date();
    if (year === now.getFullYear() && month === now.getMonth()) {

    }
    else if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth())) {

    }
    else {

    }
};

export const dateToYearMonthDate = (date: Date): string => `${date.getFullYear()}. ${date.getMonth()+1}. ${date.getDate()}`;

export const dateToYearMonthDateNumber = (date: Date): number => parseInt(`${date.getFullYear()}${String(date.getMonth()+1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`);

export const dateToHourMinute = (date: Date): string => `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    
export const yearMonthDateToDate = (yearMonthDate: string): Date => new Date(parseInt(yearMonthDate.split(". ")[0]), parseInt(yearMonthDate.split(". ")[1])-1, parseInt(yearMonthDate.split(". ")[2]));

export const isSameDate = (date1: Date, date2: Date): boolean => date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();

export const eventsToEventsByDate = (events: IEvent[]) => {
    const eventsByDate: IEventsByDate = {}; // NO or START or END

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
                else eventsByDate[i].push([idx, "NO"]);
            }
        }
    });
    return eventsByDate;
}