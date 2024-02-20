import { useState, useRef, useEffect } from 'react';
import './StatusBar.css'
import { ReactComponent as Mobile } from "../svg/Mobile.svg";
import { ReactComponent as Wifi } from "../svg/Wifi.svg";
import { ReactComponent as Battery } from "../svg/Battery.svg";
import { ReactComponent as GPS } from "../svg/GPS.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { statusBarColorState } from '../utils/atom';
import { useRecoilState } from 'recoil';

const nowTime = () => {
    const now: Date = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

const StatusBar = () => {
    const [clock, setClock] = useState<string>(nowTime());
    const [statusBarColor, setStatusBarColor] = useRecoilState(statusBarColorState);
    setInterval(() => setClock(nowTime()), 1000);

    const statusBar = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (statusBar?.current !== null) statusBar.current.style.setProperty("color", statusBarColor);
    }, [statusBarColor]);

    return (
        <div id="statusBar" ref={statusBar}>
            <div id="clockLocation">
                <span id="clock">{clock}</span>
                {/* <span id="gps"><GPS width="1.7vh" height="1.7vh"/></span> */}
            </div>
            <div id="mobileWifiBattery">
                <Mobile width="2vh"/>
                <Wifi width="2vh"/>
                <Battery width="3vh"/>
            </div>
        </div>
    );
}
  
export default StatusBar;