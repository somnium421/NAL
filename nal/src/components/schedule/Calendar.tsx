import { useState, useEffect } from 'react';
import './Calendar.css';
import { ReactComponent as AddButton } from '../../svg/ScheduleAdd.svg';
import { getCurrentLocation, getMonthlyWeather } from '../../utils/util';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { currentEventState, showEventState } from '../../utils/atom';
import Rain from '../../img/Rain.png';

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const current = new Date();
const currentYear = current.getFullYear();
const currentMonth = current.getMonth();
const currentDate = current.getDate();
const currentDay = current.getDay();

const DaysRow = () => {
    const content: JSX.Element[] = [];
    for (let i: number = 0; i<7; i++) {
        content.push(<div key={days[i]} className="day">{days[i]}</div>);
    }
    return content;
}

const Dates = () => {
    const [clickedDate, setClickedDate] = useState<number | null>(currentDate);

    const dates: (number | null)[] = [];
    for (let i:number = 0; i<new Date(currentYear, currentMonth, 1).getDay(); i++) dates.push(null);
    for (let i:number = 1; i<=new Date(currentYear, currentMonth+1, 0).getDate(); i++) dates.push(i);
    while (dates.length%7) dates.push(null);

    let content:JSX.Element[] = [];

    for (let row:number = 0; row<dates.length/7; row++) {
        if (row) content.push(<hr key={row} className="calendarLine"></hr>)
        content.push(<div key={"row"+row} className="datesRow">
            {dates.slice(row*7, (row+1)*7).map((item, idx) => {
                const key = row*7+idx;
                let className = "dateComp";
                if (dates[key]===null) className += " null";
                else if (dates[key]===currentDate) className += " today";
                if (dates[key]===clickedDate) className += " clicked";
                return (
                    <div key={"date"+key} className={className} onClick={() => {
                        if (typeof dates[key] === "number") setClickedDate(dates[key]);
                    }}>
                        {dates[key]
                        ?<><img src={Rain} alt="" className="calendarWeatherIcon"></img>
                        <div>{dates[key]}</div>
                        <div className="calendarDots"><div className="calendarDot"/><div className="calendarDot"/></div></>
                        :<div>&nbsp;</div>}
                    </div>
                )
            })}
        </div>);
    }

    return content;
}

const Calendar = () => {
    const [showEvent, setShowEvent] = useRecoilState(showEventState);
    const [currentLocationName, setCurrentLocationName] = useState<string>("");
    const resetCurrentEvent = useResetRecoilState(currentEventState);

    const location = getCurrentLocation();
    useEffect(() => {
        if (location instanceof Promise) {
            location.then((currentLocation) => {
                setCurrentLocationName(currentLocation.name);
            })
        }
        else setCurrentLocationName(location.name);
    }, []);

    return (
        <div id="calendarBox">
            <div id="currentLocation">{currentLocationName}&nbsp;</div>
            <div style={{height: "0.4vh"}}/>
            <div id="yearAndMonth">{month[currentMonth]+" "+currentYear}</div>
            <div style={{height: "1.3vh"}}/>
            <div id="calendar">
                <div id="days">{DaysRow()}</div>
                <div style={{height: "0.3vh"}}/>
                <div id="dates">
                    {Dates()}
                </div>
            </div>
            <div id="addButton">
            <AddButton width="3vh" height="3vh" onClick={()=> {
                resetCurrentEvent();
                setShowEvent(true);
            }}/>
            </div>
        </div>
    )
}

export default Calendar;