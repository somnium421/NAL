import { useRecoilValue } from 'recoil';
import './App.css';
import './fonts/font.css';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import MorePage from './pages/MorePage';
import EventPage from './pages/EventPage';
import ModiPage from './pages/ModiPage';
import StatusBar from './components/fund/StatusBar';
import NavBar from './components/fund/NavBar';
import { modeState, showModiState, showEventState } from './utils/atom';
import { CSSTransition } from 'react-transition-group';

const App = ()=> {
  const mode = useRecoilValue(modeState);
  const showModi = useRecoilValue(showModiState);
  const showEvent = useRecoilValue(showEventState);

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
          <CSSTransition in={showModi} timeout={500} classNames="sidePage" unmountOnExit>
              <ModiPage/>
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
