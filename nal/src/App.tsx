import { useState, useEffect } from 'react';
import './App.css';
import './font/font.css';
import HomePage from './home/HomePage';
import SchedulePage from './schedule/SchedulePage';
import StatusBar from './components/StatusBar';
import NavBar from './components/NavBar';
import NotiPage from './noti/NotiPage';

const App = ()=> {
  const [mode, setMode] = useState<string>("HOME"); // HOME, SCHEDULE, MORE
  const [notiMode, setNotiMode] = useState<boolean>(false);
  const [statusBarColor, setStatusBarColor] = useState<string>("white");

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
          <NavBar mode={mode} notiMode={notiMode} setMode={setMode} setNotiMode={setNotiMode}/>
          {notiMode && <NotiPage notiMode={notiMode} setNotiMode={setNotiMode}/>}
          <StatusBar color={statusBarColor}/>
        </div>
        <img id="iPhoneFrame" draggable="false" src="img/iPhoneFrame.png" alt=""/>
      </div>
    </div>
  );
}

export default App;
