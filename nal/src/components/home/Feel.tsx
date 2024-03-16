import './Feel.css';
import tooCold from '../../img/TooCold.png';
import cold from '../../img/Cold.png';
import fine from '../../img/Fine.png';
import hot from '../../img/Hot.png';
import tooHot from '../../img/TooHot.png';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { recordState, showFeelState } from '../../utils/atom';
import { WeatherSnapshot, getCurrentWeather } from '../../utils/util';
import { useEffect, useState } from 'react';
const feels = [[tooCold, "Too Cold"], [cold, "Cold"], [fine, "Fine"], [hot, "Hot"], [tooHot, "Too Hot"]];

const Buttons = () => {
  const setShowFeel = useSetRecoilState(showFeelState);
  const [record, setRecord] = useRecoilState(recordState);
  const currentWeather = getCurrentWeather() as WeatherSnapshot;
  const [backwardClicked, setBackwardClicked] = useState<boolean>(false);

  useEffect(() => {
    if (backwardClicked) setShowFeel(false);
  }, [record]);

  return (
    feels.map(feel => <div key={feel[1]} className="feelButton" onClick={() => {
      let tmp = [...record];
      tmp.push({
        temperature: {
          current: currentWeather.temperature.current,
          feel: currentWeather.temperature.feel,
          high: currentWeather.temperature.high,
          low: currentWeather.temperature.low,
        },
        main: currentWeather.main,
        humidity: currentWeather.humidity,
        pressure: currentWeather.pressure,
        wind: {
          direction: currentWeather.wind.direction,
          speed: currentWeather.wind.speed,
        },
        photos: {
          main: "",
          other: [],
        },
        felt: feel[1].toLowerCase(),
        date: new Date(),
      });
      setRecord(tmp);
      setBackwardClicked(true);
    }}>
      <img src={feel[0]} alt="" className="feelButtonImg"/>
      <div>{feel[1]}</div>
    </div>)
  )
};

const Feel = () => {
  return (
    <div id="feel">
      <div>How did the weather feel today?</div>
      <div style={{height: "1vh"}}/>
      <div id="feelButtons">{Buttons()}</div>
    </div>
  )
}

export default Feel;