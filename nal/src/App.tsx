import React from 'react';
import './App.css';
import StatusBar from './StatusBar';
import NavBar from './NavBar';


const App = ()=> {
  return (
    <div>
      <div id="iPhone">
        <div id="screen">
          <img id="exampleImg" src="img/Home.jpg" alt="" />
          <StatusBar/>
          <NavBar/>
        </div>
        <img id="iPhoneFrame" src="img/iPhoneFrame.png" alt=""/>
      </div>
    </div>
  );
}

export default App;
