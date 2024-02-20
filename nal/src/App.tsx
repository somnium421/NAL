import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import './App.css';
import './font/font.css';
import HomePage from './home/HomePage';
import SchedulePage from './schedule/SchedulePage';
import StatusBar from './components/StatusBar';
import NavBar from './components/NavBar';
import NotiPage from './noti/NotiPage';
import ModiPage from './modi/ModiPage';
import { modeState, notiModeState, modiModeState, statusBarColorState } from './utils/atom';

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
          {notiMode && <NotiPage/>}
          {modiMode && <ModiPage/>}
          <StatusBar/>
        </div>
        <img id="iPhoneFrame" draggable="false" src="img/iPhoneFrame.png" alt=""/>
      </div>
    </div>
  );
}

export default App;
