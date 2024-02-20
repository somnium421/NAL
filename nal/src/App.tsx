import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import './App.css';
import './fonts/font.css';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import StatusBar from './components/StatusBar';
import NavBar from './components/NavBar';
import NotiPage from './pages/NotiPage';
import ModiPage from './pages/ModiPage';
import { modeState, notiModeState, modiModeState, statusBarColorState } from './utils/atom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const App = ()=> {
  const [mode, setMode] = useRecoilState(modeState); // HOME, SCHEDULE, MORE
  const [notiMode, setNotiMode] = useRecoilState(notiModeState);
  const [modiMode, setModiMode] = useRecoilState(modiModeState);
  const [statusBarColor, setStatusBarColor] = useRecoilState(statusBarColorState);

  useEffect(() => {
    if ((mode === "HOME" || mode === "SCHEDULE") && notiMode === false) setStatusBarColor("white");
    else setStatusBarColor("black");
  });  

  return (
    <div>
      <div id="iPhone">
        <div id="screen">
          {mode === "HOME" && <HomePage/>}
          {mode === "SCHEDULE" && <SchedulePage/>}
          <NavBar/>
          <CSSTransition
            in={notiMode}
            timeout={1000}
            classNames="sidePage"
            unmountOnExit>
              <NotiPage/>
          </CSSTransition>
          <CSSTransition
            in={modiMode}
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
