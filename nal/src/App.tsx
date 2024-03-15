import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import './App.css';
import './fonts/font.css';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import MorePage from './pages/MorePage';
import EventPage from './pages/EventPage';
import StatusBar from './components/fund/StatusBar';
import NavBar from './components/fund/NavBar';
import { eventsByDateState, eventsState, modeState, notificationState, recordState, showEventState, showNotiState, currentWeatherState } from './utils/atom';
import { CSSTransition } from 'react-transition-group';
import { useEffect } from 'react';
import { IJSONEvent, IJSONNotification, eventsToEventsByDate, getCurrentWeather } from './utils/util';
import NotiPage from './pages/NotiPage';
import LaunchPage from './pages/LaunchPage';
import OpenAI from "openai";
import { config } from './utils/apiKey';
const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const App = ()=> {
  const [mode, setMode] = useRecoilState(modeState);
  const showEvent = useRecoilValue(showEventState);
  const [events, setEvents] = useRecoilState(eventsState);
  const [eventsByDate, setEventsByDate] = useRecoilState(eventsByDateState);
  const showNoti = useRecoilValue(showNotiState);
  const setNotification = useSetRecoilState(notificationState);
  const setRecord = useSetRecoilState(recordState);
  const [currentWeather, setCurrentWeather] = useRecoilState(currentWeatherState);
  
  

  useEffect(() => {
    fetch("schedule.json")
    .then(response => response.json())
    .then(items => {
      const date = new Date();
      setEvents(items.map((item: IJSONEvent) => ({
                activity: item.activity,
                time: [new Date(date.getFullYear(), date.getMonth(), date.getDate()+item.time[0][0], item.time[0][1], item.time[0][2]), 
                       new Date(date.getFullYear(), date.getMonth(), date.getDate()+item.time[1][0], item.time[1][1], item.time[1][2])],
                location: item.location,
                note: item.note,
                climate: item.climate,
      })));
    });
    fetch("notification.json")
    .then(response => response.json())
    .then(items => {
        setNotification(items);
    });
    fetch("record.json")
    .then(response => response.json())
    .then(items => {
      setRecord(items);
    })
  }, []);

  useEffect(() => {
      const weather = getCurrentWeather();
      if (weather instanceof Promise) {
          weather.then((weather) => setCurrentWeather(weather));
      }
      else setCurrentWeather(weather);
  }, []);

  const callOpenAi = async () => {
    try {
      console.log('clicked')
      const response = await openai.chat.completions.create({
        messages: [{role: "user", content: "Hi!"}],
        model: "gpt-3.5-turbo",
      });
      console.log(response.choices[0].message.content);
    } catch (error) {
      console.error("OpenAI API 호출 오류:", error);
    }
  }

  useEffect(() => {
    if (events) setEventsByDate(eventsToEventsByDate(events));
  }, [events]);

  useEffect(() => {
    if (currentWeather.main !== "") setMode("HOME");
  }, [currentWeather]);

  return (
    <div>
      <div id="iPhone">
        <div id="screen">
          {mode === "HOME" && <HomePage/>}
          {mode === "SCHEDULE" && <SchedulePage/>}
          {mode === "MORE" && <MorePage/>}
          <NavBar/>
          <CSSTransition in={showNoti} timeout={500} classNames="sidePage" unmountOnExit>
              <NotiPage/>
          </CSSTransition>
          <CSSTransition in={showEvent !== "false"} timeout={500} classNames="sidePage" unmountOnExit>
              <EventPage/>
          </CSSTransition>
          {mode === "LAUNCH" && <LaunchPage/>}
          <StatusBar/>
        </div>
        <div id="homeIndicator" onClick={callOpenAi}/>
        <img id="iPhoneFrame" draggable="false" src="img/iPhoneFrame.png" alt=""/>
      </div>
    </div>
  );
}

export default App;


            
