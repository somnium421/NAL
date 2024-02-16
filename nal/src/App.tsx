import React from 'react';
import './App.css';
import StatusBar from './StatusBar';
import NavBar from './NavBar';
import HomePhoto from './HomePhoto';
import HomeScroll from './HomeScroll';

const App = ()=> {
  return (
    <div>
      <div id="iPhone">
        <div id="screen">
          <HomePhoto/>
          <HomeScroll/>
          <StatusBar/>
          <NavBar/>
        </div>
        <img id="iPhoneFrame" draggable="false" src="img/iPhoneFrame.png" alt=""/>
      </div>
    </div>
  );
}

export default App;
