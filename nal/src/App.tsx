import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import './App.css';
import './fonts/font.css';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import EventPage from './pages/EventPage';
import StatusBar from './components/fund/StatusBar';
import NavBar from './components/fund/NavBar';
import { eventsByDateState, eventsState, modeState, notificationState, recordState, showEventState, showNotiState, currentWeatherState } from './utils/atom';
import { CSSTransition } from 'react-transition-group';
import { useEffect } from 'react';
import { IJSONEvent, checkEventsModify, eventsToEventsByDate, eventsToNotification, getCurrentWeather, getEventWeather } from './utils/util';
import NotiPage from './pages/NotiPage';
import LaunchPage from './pages/LaunchPage';
import iPhoneFrame from './img/iPhoneFrame.png';

const App = ()=> {
  const [mode, setMode] = useRecoilState(modeState);
  const showEvent = useRecoilValue(showEventState);
  const showNoti = useRecoilValue(showNotiState);
  const setEvents = useSetRecoilState(eventsState);
  const setEventsByDate = useSetRecoilState(eventsByDateState);
  const setRecord = useSetRecoilState(recordState);
  const setCurrentWeather = useSetRecoilState(currentWeatherState);
  const setNotification = useSetRecoilState(notificationState);

  useEffect(() => {
    fetch("schedule.json")
    .then(response => response.json())
    .then(items => {
      const date = new Date();
      checkEventsModify(items.map((item: IJSONEvent) => {
        const startsTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()+item.time[0][0], item.time[0][1], item.time[0][2]);
        const endsTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()+item.time[1][0], item.time[1][1], item.time[1][2]);
        const eventWeather = getEventWeather(startsTime, endsTime);
        return {
                activity: item.activity,
                time: [startsTime, endsTime],
                location: item.location,
                note: item.note,
                modify: eventWeather === "Rain" || eventWeather === "Snow",
      }}))
      .then((events) => {
        setEvents(events);
        setEventsByDate(eventsToEventsByDate(events));
        setNotification(eventsToNotification(events));
      })
    });
    fetch("record.json")
    .then(response => response.json())
    .then(items => {
      setRecord(items);
    });
    const weather = getCurrentWeather();
      if (weather instanceof Promise) {
        weather.then((weather) => {
          setCurrentWeather(weather);
          setMode("HOME");
        });
      }
      else {
        setCurrentWeather(weather);
        setMode("HOME");
      }
  }, []);

  return (
    <div>
      <div id="iPhone">
        <div id="screen">
          {mode === "HOME" && <HomePage/>}
          {mode === "SCHEDULE" && <SchedulePage/>}
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
        <div id="homeIndicator"/>
        <img id="iPhoneFrame" draggable="false" src={iPhoneFrame} alt=""/>
      </div>
    </div>
  );
}

export default App;


            
