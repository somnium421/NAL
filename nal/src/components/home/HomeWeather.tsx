import { dateToHourMinute, dateToYearMonthDateNumber, numberToMonthDateYear } from '../../utils/util'
import './HomeWeather.css'
import { ReactComponent as WeatherIcon } from "../../svg/WeatherIcon.svg";
import Clear from '../../img/Clear.png';
import Rain from '../../img/Rain.png';
import Snow from '../../img/Snow.png';
import Clouds from '../../img/Clouds.png';
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
        let content;
        switch (currentWeather.main) {
            case "Clear": content = <>It is clear outside<br/>Wear sunscreen!</>; break;
            case "Clouds": content = <>It is cloudy outside<br/>Still, wear sunscreen!</>; break;
            case "Rain": content = <>It is raining outside<br/>Take an umbrella!</>; break;
            case "Snow": content = <>It is snowing outisde<br/>Take an umbrella!</>
        }
        return (
            <div id="textInfo">{
                weatherMode === "HOME"
                ?content
                :<>{dateToHourMinute(new Date(similarDateRecord.date))}<br/>Yongsan-gu, Seoul</>
            }</div>
        )
    }

    const IconTemp = () => {
        let content;
        switch (currentWeather.main) {
            case "Clear": content = <><div id="currentTemp">
                                          {weatherMode==="HOME"?currentWeather.temperature.current:similarDateRecord.temperature.current}
                                      </div>
                                      <img src={Clear} alt="" id="weatherIcon" style={{height: "3vh", width: "3vh", margin: "-0.3vh 0 0 0.3vh"}}/></>; break;
            case "Rain": content = <><div id="currentTemp">
                                          {weatherMode==="HOME"?currentWeather.temperature.current:similarDateRecord.temperature.current}
                                      </div>
                                      <img src={Rain} alt="" id="weatherIcon" style={{height: "3vh", width: "1.9vh", marginLeft: "0.5vh"}}/></>; break;
            case "Snow": content = <><div id="currentTemp">
                                          {weatherMode==="HOME"?currentWeather.temperature.current:similarDateRecord.temperature.current}
                                      </div>
                                      <img src={Snow} alt="" id="weatherIcon" style={{height: "2.5vh", width: "2.5vh", marginLeft: "0.5vh"}}/></>; break;
            case "Clouds": content = <><div id="currentTemp">
                                          {weatherMode==="HOME"?currentWeather.temperature.current:similarDateRecord.temperature.current}
                                      </div>
                                      <img src={Clouds} alt="" id="weatherIcon" style={{height: "1.6vh", width: "2.3vh", marginLeft: "0.5vh"}}/></>; break;

        }
        return (
            <div id="iconTemp">{content}</div>
        )
    }

    return (
        <div id="weather">
            <div id="weatherLeft">
                <TextInfo/>
                <div style={{height: "1vh"}}/>
                <div id="buttonInfos">
                    <div className="buttonInfo">Humid. {weatherMode==="HOME"?currentWeather.humidity:similarDateRecord.humidity}%</div>
                    <div className="buttonInfo">Wind {(weatherMode==="HOME"?currentWeather.wind?.direction:similarDateRecord.wind.direction)+" "+(weatherMode==="HOME"?currentWeather.wind?.speed:similarDateRecord.wind.speed)}m/s</div>
                    <div className="buttonInfo">Pres. {weatherMode==="HOME"?currentWeather.pressure:similarDateRecord.pressure} hPA</div>
                    <div className="buttonInfo">Feels like {weatherMode==="HOME"?currentWeather.temperature.feel:similarDateRecord.temperature.feel}°</div>
                </div>
            </div>
            <div id="weatherRight">
                <IconTemp/>
                <div id="highLowTemp">H : {weatherMode==="HOME"?currentWeather.temperature.high:similarDateRecord.temperature.high}°&nbsp;&nbsp;&nbsp;L : {weatherMode==="HOME"?currentWeather?.temperature.low:similarDateRecord.temperature.low}°</div>
            </div>
        </div>
    )
}

export default HomeWeather;