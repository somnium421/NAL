import { useRecoilState, useRecoilValue } from 'recoil';
import './App.css';
import './fonts/font.css';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import MorePage from './pages/MorePage';
import EventPage from './pages/EventPage';
import StatusBar from './components/fund/StatusBar';
import NavBar from './components/fund/NavBar';
import { eventsByDateState, eventsState, modeState, showEventState } from './utils/atom';
import { CSSTransition } from 'react-transition-group';
import { useEffect } from 'react';
import { IJSONEvent, eventsToEventsByDate } from './utils/util';

const App = ()=> {
  const mode = useRecoilValue(modeState);
  const showEvent = useRecoilValue(showEventState);
  const [events, setEvents] = useRecoilState(eventsState);
  const [eventsByDate, setEventsByDate] = useRecoilState(eventsByDateState);

  useEffect(() => {
    fetch("schedule.json")
    .then(response => response.json())
    .then(items => {
      const date = new Date();
      setEvents(items.map((item: IJSONEvent, idx: number) => ({
                idx: idx,
                activity: item.activity,
                time: [new Date(date.getFullYear(), date.getMonth(), date.getDate()+parseInt(item.time[0][0]), parseInt(item.time[0][1]), parseInt(item.time[0][2])), 
                       new Date(date.getFullYear(), date.getMonth(), date.getDate()+parseInt(item.time[1][0]), parseInt(item.time[1][1]), parseInt(item.time[1][2]))],
                location: item.location,
                note: item.note,
                climate: item.climate,
      })));
    })
  }, []);

  useEffect(() => {
    if (events) setEventsByDate(eventsToEventsByDate(events));
  }, [events])

  return (
    <div>
      <div id="iPhone">
        <div id="screen">
          {mode === "HOME" && <HomePage/>}
          {mode === "SCHEDULE" && <SchedulePage/>}
          {mode === "MORE" && <MorePage/>}
          <NavBar/>
          <CSSTransition in={showEvent} timeout={500} classNames="sidePage" unmountOnExit>
              <EventPage/>
          </CSSTransition>
          <StatusBar/>
        </div>
        <div id="homeIndicator"/>
        <img id="iPhoneFrame" draggable="false" src="img/iPhoneFrame.png" alt=""/>
      </div>
    </div>
  );
}

export default App;
