import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import './App.css';
import './fonts/font.css';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import MorePage from './pages/MorePage';
import NotiPage from './pages/NotiPage';
import EventPage from './pages/EventPage';
import ModiPage from './pages/ModiPage';
import StatusBar from './components/fund/StatusBar';
import NavBar from './components/fund/NavBar';
import { modeState, showNotiState, showModiState, showEventState, statusBarColorState } from './utils/atom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const App = ()=> {
  const [mode, setMode] = useRecoilState(modeState); // HOME, SCHEDULE, MORE
  const [showNoti, setshowNoti] = useRecoilState(showNotiState);
  const [showModi, setshowModi] = useRecoilState(showModiState);
  const [showEvent, setShowEvent] = useRecoilState(showEventState);
  const [statusBarColor, setStatusBarColor] = useRecoilState(statusBarColorState);

  useEffect(() => {
    if (showNoti || showModi || mode === "MORE") setStatusBarColor("black");
    else setStatusBarColor("white");
  });  

  return (
    <div>
      <div id="iPhone">
        <div id="screen">
          {mode === "HOME" && <HomePage/>}
          {mode === "SCHEDULE" && <SchedulePage/>}
          {mode === "MORE" && <MorePage/>}
          <NavBar/>
          <CSSTransition
            in={showNoti}
            timeout={500}
            classNames="sidePage"
            unmountOnExit>
              <NotiPage/>
          </CSSTransition>
          <CSSTransition
            in={showEvent}
            timeout={500}
            classNames="sidePage"
            unmountOnExit>
              <EventPage/>
          </CSSTransition>

          <CSSTransition
            in={showModi}
            timeout={500}
            classNames="sidePage"
            unmountOnExit>
              <ModiPage/>
          </CSSTransition>
          <StatusBar/>
        </div>
        <img id="iPhoneFrame" draggable="false" src="img/iPhoneFrame.png" alt=""/>
      </div>
    </div>
  );
}

export default App;
