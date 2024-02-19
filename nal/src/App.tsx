import { useState } from 'react';
import './App.css';
import './font/font.css';
import HomePage from './home/HomePage';
import SchedulePage from './schedule/SchedulePage';
import StatusBar from './components/StatusBar';
import NavBar from './components/NavBar';

const App = ()=> {
  const [mode, setMode] = useState<string>("HOME");

  return (
    <div>
      <div id="iPhone">
        <div id="screen">
          {mode === "HOME" && <HomePage/>}
          {mode === "SCHEDULE" && <SchedulePage/>}
          <StatusBar/>
          <NavBar mode={mode} setMode={setMode}/>
        </div>
        <img id="iPhoneFrame" draggable="false" src="img/iPhoneFrame.png" alt=""/>
      </div>
    </div>
  );
}

export default App;
