import { useState, useEffect } from 'react';
import './StatusBar.css'
import { ReactComponent as Mobile } from "../../svg/Mobile.svg";
import { ReactComponent as Wifi } from "../../svg/Wifi.svg";
import { ReactComponent as Battery } from "../../svg/Battery.svg";
import { modeState, showEventState, showNotiState } from '../../utils/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dateToHourMinute } from '../../utils/util';

const StatusBar = () => {
    const [time, setTime] = useState<string>(dateToHourMinute(new Date));
    const [statusBarColor, setStatusBarColor] = useState<string>();
    setInterval(() => setTime(() => dateToHourMinute(new Date)), 1000);
    const mode = useRecoilValue(modeState);
    const showNoti = useRecoilValue(showNotiState);
    const showEvent = useRecoilValue(showEventState);

    useEffect(() => {
        if ((mode==="HOME" && !(showNoti || showEvent !== "false")) || mode==="LAUNCH") setStatusBarColor("white");
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
