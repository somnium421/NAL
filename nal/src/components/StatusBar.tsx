import { useState, useRef, useEffect } from 'react';
import './StatusBar.css'
import { ReactComponent as Mobile } from "../svg/Mobile.svg";
import { ReactComponent as Wifi } from "../svg/Wifi.svg";
import { ReactComponent as Battery } from "../svg/Battery.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'

interface Props {
    color: string;
}

const nowTime = () => {
    const now: Date = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

const StatusBar = (props: Props) => {
    const [clock, setClock] = useState<string>(nowTime());
    setInterval(() => setClock(nowTime()), 1000);

    const color = props.color;
    const statusBar = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (statusBar?.current !== null) statusBar.current.style.setProperty("color", color);
    }, [color]);

    return (
        <div id="statusBar" ref={statusBar}>
            <div id="clockLocation">
                <span id="clock">{clock}</span>
                <span id="location"><FontAwesomeIcon icon={faLocationArrow}/></span>
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
