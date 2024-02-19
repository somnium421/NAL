import React, { useState, useEffect } from 'react'
import { Weather, getCurrentWeather } from '../utils/util'
import './HomeWeather.css'
import '../font/font.css'
import { ReactComponent as WeatherIcon } from "../svg/WeatherIcon.svg";

const HomeWeather = () => {
    const [currentTemp, setCurrentTemp] = useState<string>('0');
    const [highTemp, setHighTemp] = useState<string>('0');
    const [lowTemp, setLowTemp] = useState<string>('0');
    const setTemp = (weather: Weather) => {
        setCurrentTemp(weather.current);
        setLowTemp(weather.low);
        setHighTemp(weather.high);
    }

    useEffect(() => {
        const currentWeather = getCurrentWeather();
        if (currentWeather instanceof Promise) {
            currentWeather.then((currentWeather) => setTemp(currentWeather));
        }
        else setTemp(currentWeather);
    }, [])

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
                <div id="highLowTemp">H:{highTemp}° L:{lowTemp}°</div>
            </div>
        </div>
    )
}

export default HomeWeather;