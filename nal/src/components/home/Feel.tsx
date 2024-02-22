import React from 'react'
import './Feel.css';
import tooCold from '../../img/TooCold.png';
import cold from '../../img/Cold.png';
import fine from '../../img/Fine.png';
import hot from '../../img/Hot.png';
import tooHot from '../../img/TooHot.png';
import { useRecoilState } from 'recoil';
import { showFeelState } from '../../utils/atom';

const items = [[tooCold, "Too Cold"], [cold, "Cold"], [fine, "Fine"], [hot, "Hot"], [tooHot, "Too Hot"]];

const Buttons = () => {
  const [showFeel, setShowFeel] = useRecoilState(showFeelState);
  return (
    items.map(item => <div key={item[1]} className="feelButton" onClick={() => setShowFeel(false)}>
      <img src={item[0]} alt="" className="feelButtonImg"></img>
      <div>{item[1]}</div>
    </div>)
  )
}


const Feel = () => {
  return (
    <div id="feel">
      <div>How did the weather feel today?</div>
      <div style={{height: "1vh"}}></div>
      <div id="feelButtons">{Buttons()}</div>
    </div>
  )
}

export default Feel;