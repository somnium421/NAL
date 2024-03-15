import { dateToHourMinute, dateToYearMonthDateNumber, numberToMonthDateYear } from '../../utils/util'
import './HomeWeather.css'
import { ReactComponent as WeatherIcon } from "../../svg/WeatherIcon.svg";
import { useRecoilValue } from 'recoil';
import { similarDateRecordState, currentWeatherState } from '../../utils/atom';

interface Props {
    weatherMode: string; // HOME or MODAL
}

const HomeWeather = (props: Props) => {
    const {weatherMode} = props;
    const currentWeather = useRecoilValue(currentWeatherState);
    const similarDateRecord = useRecoilValue(similarDateRecordState);
    
    const TextInfo = () => {
        return (
            <div id="textInfo">{
                weatherMode === "HOME"
                ?<>It might rain at 4PM<br/>Prepare an umbrella!</>
                :<>{dateToHourMinute(new Date(similarDateRecord.date))}<br/>Yongsan-gu, Seoul</>
            }</div>
        )
    }

    return (
        <div id="weather">
            <div id="weatherLeft">
                <TextInfo/>
                <div id="buttonInfos">
                    <div className="buttonInfo">Humid. {weatherMode==="HOME"?currentWeather.humidity:similarDateRecord.humidity}%</div>
                    <div className="buttonInfo">Feels like {weatherMode==="HOME"?currentWeather.temperature.feel:similarDateRecord.temperature.feel}°</div>
                    <div className="buttonInfo">Pres. {weatherMode==="HOME"?currentWeather.pressure:similarDateRecord.pressure} hPA</div>
                    <div className="buttonInfo">{(weatherMode==="HOME"?currentWeather.wind?.direction:similarDateRecord.wind.direction)+" "+(weatherMode==="HOME"?currentWeather.wind?.speed:similarDateRecord.wind.speed)}m/s</div>   
                </div>
            </div>
            <div id="weatherRight">
                <div id="iconTemp">
                    <WeatherIcon id="weatherIcon"/>
                    <div id="currentTemp">{weatherMode==="HOME"?currentWeather.temperature.current:similarDateRecord.temperature.current}°</div>
                </div>
                <div id="highLowTemp">H:{weatherMode==="HOME"?currentWeather.temperature.high:similarDateRecord.temperature.high}°&nbsp;&nbsp;L:{weatherMode==="HOME"?currentWeather?.temperature.low:similarDateRecord.temperature.low}°</div>
            </div>
        </div>
    )
}

export default HomeWeather;