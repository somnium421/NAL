import { useState } from 'react';
import './App.css';
import './font.css';
import StatusBar from './StatusBar';
import NavBar from './NavBar';
import HomePhoto from './HomePhoto';
import HomeScroll from './HomeScroll';

const App = ()=> {
  const [mode, setMode] = useState<string>("HOME");

  let content: JSX.Element = <></>;

  if (mode === "HOME") {
    content = <><HomePhoto/><HomeScroll/></>;
  }

  return (
    <div>
      <div id="iPhone">
        <div id="screen">
          {content}
          <StatusBar/>
          <NavBar mode={mode} setMode={setMode}/>
        </div>
        <img id="iPhoneFrame" draggable="false" src="img/iPhoneFrame.png" alt=""/>
      </div>
    </div>
  );
}

export default App;
