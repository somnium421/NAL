import { useState, useEffect } from 'react';
import './StatusBar.css'
import { ReactComponent as Mobile } from "../../svg/Mobile.svg";
import { ReactComponent as Wifi } from "../../svg/Wifi.svg";
import { ReactComponent as Battery } from "../../svg/Battery.svg";
import { modeState, showEventState, showModiState, showNotiState, statusBarColorState } from '../../utils/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

const nowTime = () => {
    const now: Date = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

const StatusBar = () => {
    const [time, setTime] = useState<string>(nowTime());
    setInterval(() => setTime(nowTime()), 1000);
    
    const [statusBarColor, setStatusBarColor] = useRecoilState(statusBarColorState);
    const mode = useRecoilValue(modeState);
    const showNoti = useRecoilValue(showNotiState);
    const showModi = useRecoilValue(showModiState);
    const showEvent = useRecoilValue(showEventState);

    useEffect(() => {
        if (mode==="HOME" && !(showNoti || showModi || showEvent)) setStatusBarColor("white");
        else setStatusBarColor("black");
    }); 

    return (
        <div id="statusBar" style={{color: statusBarColor}}>
            <div id="clock">{time}</div>
            <div id="mobileWifiBattery">
                <Mobile width="2vh"/>
                <Wifi width="2vh"/>
                <Battery width="3vh"/>
            </div>
        </div>
    );
};
  
export default StatusBar;
