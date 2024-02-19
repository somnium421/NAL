import React, { useState, useEffect } from 'react'
import './Weather.css'
import '../font/font.css'
import { config } from '../utils/apiKey'
import { ReactComponent as WeatherIcon } from "../svg/WeatherIcon.svg";
const WEATHER_API_KEY = config.WEATHER_API_KEY;

interface ILocation {
    longitude: number;
    latitude: number;
    updated: boolean;
}

interface ITemperature {
    current: string;
    high: string;
    low: string;
    updated: boolean;
}

const location: ILocation = {
    longitude: 0,
    latitude: 0,
    updated: false,
};

const temperature: ITemperature = {
    current: '',
    high: '',
    low: '',
    updated: false,
}

// const getCurrentTemp = () => {
//     console.log(location);
//     // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${WEATHER_API_KEY}&units=metric`)
//     // .then((response) => response.json())
//     // .then((json) => {
//     //     console.log(json);
//     //     setCurrentTemp((json.main.temp).toFixed());
//     //     setLowTemp((json.main.temp_min).toFixed());
//     //     setHighTemp((json.main.temp_max).toFixed());
//     // });
//     temperature.current = "23";
//     temperature.high = "29";
//     temperature.low = "16"
// }

const getLocation = () => {
    return new Promise<GeolocationPosition>((resolve) => {
        navigator.geolocation.getCurrentPosition(resolve);
    })
}

const getCurrentWeatherInfo = async (setCurrentTemp: React.Dispatch<React.SetStateAction<string>>,
    setHighTemp: React.Dispatch<React.SetStateAction<string>>,
    setLowTemp: React.Dispatch<React.SetStateAction<string>>) => {
    getLocation().then((pos) => {
        location.longitude = pos.coords.longitude;
        location.latitude = pos.coords.latitude;
        location.updated = true;
    }).then(() => {
        temperature.current = '23';
        temperature.high = '26';
        temperature.low = '19';
        temperature.updated = true;
        setCurrentTemp(temperature.current);
        setHighTemp(temperature.high);
        setLowTemp(temperature.low);
    })
}

const Weather = () => {
    const [currentTemp, setCurrentTemp] = useState<string>(temperature.current);
    const [highTemp, setHighTemp] = useState<string>(temperature.high);
    const [lowTemp, setLowTemp] = useState<string>(temperature.low);
    
    if (!temperature.updated) getCurrentWeatherInfo(setCurrentTemp, setHighTemp, setLowTemp);

    return (
        <div id="weather">
            <div id="weatherLeft">
                <div id="textInfo">Good Morning, Suchan!<br/>It might rain at 4PM-8PM</div>
                <div id="buttonInfos">
                    <div className="buttonInfosRow">
                        <span className="buttonInfo" onClick={() => {
                            console.log("clicked");
                        }}>AQ 200</span>
                        <span className="buttonInfo">UV index 3</span>
                    </div>
                    <div className="buttonInfosRow">
                        <span className="buttonInfo">Pres. 1017hPA</span>
                        <span className="buttonInfo">SE 5m/s</span>
                    </div>
                </div>
            </div>
            <div id="weatherRight">
                <div id="iconTemp">
                    <WeatherIcon id="weatherIcon"/>
                    <div id="currentTemp">{currentTemp}°</div>
                </div>
                <div id="highLowTemp">H:{temperature.high}° L:{temperature.low}°</div>
            </div>
        </div>
    )
}

export default Weather;