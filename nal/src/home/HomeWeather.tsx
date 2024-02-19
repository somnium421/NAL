import { useState, useEffect } from 'react'
import { Weather, getCurrentWeather } from '../utils/util'
import './HomeWeather.css'
import '../font/font.css'
import { ReactComponent as WeatherIcon } from "../svg/WeatherIcon.svg";

const HomeWeather = () => {
    const [todayWeather, setTodayWeather] = useState<Weather>();

    useEffect(() => {
        const weather = getCurrentWeather();
        if (weather instanceof Promise) {
            weather.then((weather) => setTodayWeather(weather));
        }
        else setTodayWeather(weather);
    }, []);

    return (
        <div id="weather">
            <div id="weatherLeft">
                <div id="textInfo">Good Morning, Suchan!<br/>It might rain at 4PM-8PM</div>
                <div id="buttonInfos">
                    <div className="buttonInfosRow">
                        <span className="buttonInfo">Humid. {todayWeather?.humidity}%</span>
                        <span className="buttonInfo">Feels like {todayWeather?.temperature?.feel}°</span>
                    </div>
                    <div className="buttonInfosRow">
                        <span className="buttonInfo">Pres. {todayWeather?.pressure}hPA</span>
                        <span className="buttonInfo">{todayWeather?.wind[0]+" "+todayWeather?.wind[1]}m/s</span>
                    </div>
                </div>
            </div>
            <div id="weatherRight">
                <div id="iconTemp">
                    <WeatherIcon id="weatherIcon"/>
                    <div id="currentTemp">{todayWeather?.temperature?.current}°</div>
                </div>
                <div id="highLowTemp">H:{todayWeather?.temperature.high}° L:{todayWeather?.temperature.low}°</div>
            </div>
        </div>
    )
}

export default HomeWeather;