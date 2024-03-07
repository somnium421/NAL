import { useState, useEffect } from 'react'
import { Weather, dateToYearMonthDateNumber, getCurrentWeather, numberToMonthDateYear } from '../../utils/util'
import './HomeWeather.css'
import { ReactComponent as WeatherIcon } from "../../svg/WeatherIcon.svg";
import { useRecoilState, useRecoilValue } from 'recoil';
import { similarDateRecordState, todayWeatherState } from '../../utils/atom';

interface Props {
    weatherMode: string; // HOME or MODAL
}



const HomeWeather = (props: Props) => {
    const {weatherMode} = props;
    const [todayWeather, setTodayWeather] = useRecoilState(todayWeatherState);
    const similarDateRecord = useRecoilValue(similarDateRecordState);
    
    useEffect(() => {
        const weather = getCurrentWeather();
        if (weather instanceof Promise) {
            weather.then((weather) => setTodayWeather(weather));
        }
        else setTodayWeather(weather);
    }, []);

    const TextInfo = () => {
        return (
            <div id="textInfo">{
                weatherMode === "HOME"
                ?<>It might rain at 4PM<br/>Prepare an umbrella!</>
                :<>{numberToMonthDateYear(dateToYearMonthDateNumber(new Date(similarDateRecord.date)))}<br/>Yongsan-gu, Seoul</>
            }</div>
        )
    }

    return (
        <div id="weather">
            <div id="weatherLeft">
                <TextInfo/>
                <div id="buttonInfos">
                    <div className="buttonInfo">Humid. {weatherMode==="HOME"?todayWeather.humidity:similarDateRecord.humidity}%</div>
                    <div className="buttonInfo">Feels like {weatherMode==="HOME"?todayWeather.temperature.feel:similarDateRecord.temperature.feel}°</div>
                    <div className="buttonInfo">Pres. {weatherMode==="HOME"?todayWeather.pressure:similarDateRecord.pressure} hPA</div>
                    <div className="buttonInfo">{(weatherMode==="HOME"?todayWeather.wind?.direction:similarDateRecord.wind.direction)+" "+(weatherMode==="HOME"?todayWeather.wind?.speed:similarDateRecord.wind.speed)}m/s</div>   
                </div>
            </div>
            <div id="weatherRight">
                <div id="iconTemp">
                    <WeatherIcon id="weatherIcon"/>
                    {weatherMode==="HOME" && <div id="currentTemp">{todayWeather.temperature.current}°</div>}
                </div>
                <div id="highLowTemp">H:{weatherMode==="HOME"?todayWeather.temperature.high:similarDateRecord.temperature.high}°&nbsp;&nbsp;L:{weatherMode==="HOME"?todayWeather?.temperature.low:similarDateRecord.temperature.low}°</div>
            </div>
        </div>
    )
}

export default HomeWeather;