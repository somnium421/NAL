import { useState, useEffect } from 'react'
import './Weather.css'
import './font.css'
import { config } from './apiKey'
import { ReactComponent as WeatherIcon } from "./svg/WeatherIcon.svg";
const WEATHER_API_KEY = config.WEATHER_API_KEY;

interface ILocation {
    longitude: number;
    latitude: number;
}

const location: ILocation = {
    longitude: 0,
    latitude: 0
};

const getLocation = (setCurrentTemp:(temp: string)=>void, setHighTemp:(temp: string)=>void, setLowTemp:(temp: string)=>void) => {
    navigator.geolocation.getCurrentPosition((pos) => {
        location.longitude = pos.coords.longitude;
        location.latitude = pos.coords.latitude;
        getCurrentTemp(setCurrentTemp, setHighTemp, setLowTemp);
    });
}

const getCurrentTemp = (setCurrentTemp:(temp: string)=>void, setHighTemp:(temp: string)=>void, setLowTemp:(temp: string)=>void) => {
    console.log(location);
    // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${WEATHER_API_KEY}&units=metric`)
    // .then((response) => response.json())
    // .then((json) => {
    //     console.log(json);
    //     setCurrentTemp((json.main.temp).toFixed());
    //     setLowTemp((json.main.temp_min).toFixed());
    //     setHighTemp((json.main.temp_max).toFixed());
    // });
    setCurrentTemp('23');
    setLowTemp('16');
    setHighTemp('29');
}

const Weather = () => {
    const [currentTemp, setCurrentTemp] = useState<string>('');
    const [highTemp, setHighTemp] = useState<string>('');
    const [lowTemp, setLowTemp] = useState<string>('');
    getLocation(setCurrentTemp, setHighTemp, setLowTemp);
    // useEffect(() => {
    //     getCurrentTemp();
    //     const timer = setInterval(getCurrentTemp, 1000*5);
    //     return () => {
    //         clearInterval(timer);
    //     }
    // });

    return (
        <div id="weather">
            <div id="weatherLeft">
                <div id="textInfo">Good Morning, Suchan!<br/>It might rain at 4PM-8PM</div>
                <div id="buttonInfos">
                    <div className="buttonInfosRow">
                        <span className="buttonInfo">AQ 200</span>
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
                <div id="highLowTemp">H:{highTemp}° L:{lowTemp}°</div>
            </div>
        </div>
    )
}

export default Weather;