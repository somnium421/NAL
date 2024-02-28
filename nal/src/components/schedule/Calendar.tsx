import React, { useState, useEffect } from 'react';
import './Calendar.css';
import { getCurrentLocation, getMonthlyWeather, isSameDate } from '../../utils/util';
import Rain from '../../img/Rain.png';
import { useRecoilValue } from 'recoil';
import { showEventState } from '../../utils/atom';
import { ReactComponent as Arrow } from "../../svg/Arrow.svg";
const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface Props {
    onClick: React.Dispatch<React.SetStateAction<any>>;
    showWeather?: boolean;
    showDot?: boolean;
    clickedDate?: Date;
}

const Calendar = (props: Props) => {
    const today = new Date();
    const {onClick, showWeather = true, showDot = true, clickedDate = today} = props;
    const [calendarClickedDate, setCalendarClickedDate] = useState<Date>(clickedDate);
    const showEvent = useRecoilValue(showEventState);
    const [currentLocationName, setCurrentLocationName] = useState<string>("");
    const location = getCurrentLocation();

    const [year, setYear] = useState<number>(clickedDate.getFullYear());
    const [month, setMonth] = useState<number>(clickedDate.getMonth());

    const DaysRow = () => {
        const content: JSX.Element[] = [];
        const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        for (let i: number = 0; i<7; i++) {
            content.push(<div key={days[i]} className="day">{days[i]}</div>);
        }
        return content;
    }

    const Dates = () => {
        let content:JSX.Element[] = [];
        const dates: number[] = [];
        for (let i:number = 0; i<new Date(year, month, 1).getDay(); i++) dates.push(0);
        for (let i:number = 1; i<=new Date(year, month+1, 0).getDate(); i++) dates.push(i);
        while (dates.length%7) dates.push(0);
    
        for (let row:number = 0; row<dates.length/7; row++) {
            if (row) content.push(<hr key={row} className="calendarLine"></hr>)
            content.push(<div key={"row"+row} className="datesRow">
                {dates.slice(row*7, (row+1)*7).map((item, idx) => {
                    const key = row*7+idx;
                    let className = "dateComp";
                    if (dates[key] === null) className += " null";
                    else if (isSameDate(today, new Date(year, month, dates[key]))) className += " today";
                    if (isSameDate(calendarClickedDate, new Date(year, month, dates[key]))) className += " clicked";
                    return (
                        <div key={"date"+key} className={className} onClick={() => {
                            if (dates[key] !== 0) {
                                setCalendarClickedDate(new Date(year, month, dates[key]));
                                if (showEvent) onClick(`${year}. ${month+1}. ${dates[key]}`);
                                else onClick({
                                    time: [new Date(year, month, dates[key], new Date().getHours()+1), 
                                           new Date(year, month, dates[key], new Date().getHours()+2)],
                                });
                        }}}>
                            {dates[key] !== 0
                            ?<>
                            {showWeather && <img src={Rain} alt="" className="calendarWeatherIcon"/>}
                            <div>{dates[key]}</div>
                            {showDot && <div className="calendarDots"><div className="calendarDot"/><div className="calendarDot"/></div>}</>
                            :<div>&nbsp;</div>}
                        </div>
                    )
                })}
            </div>);
        }
        return content;
    }

    useEffect(() => {
        if (location instanceof Promise) {
            location
            .then(currentLocation => setCurrentLocationName(currentLocation.name));
        }
        else setCurrentLocationName(location.name);
    }, []);

    return (
    <>
        <div id="currentLocation">{currentLocationName}&nbsp;</div>
        <div style={{height: "0.4vh"}}/>
        <div id="yearMonthArrows">
            <div id="yearMonth">{monthList[month%12]+" "+year}</div>
            <div>
                <Arrow id="prevMonth" className="calendarArrow" onClick={() => {
                    const newDate = new Date(year, month-1, 1);
                    setYear(newDate.getFullYear());
                    setMonth(newDate.getMonth());
                }}/>
                <Arrow id="nextMonth" className="calendarArrow" onClick={() => {
                    const newDate = new Date(year, month+1, 1);
                    setYear(newDate.getFullYear());
                    setMonth(newDate.getMonth());
                }}/>
            </div>
        </div>
        <div style={{height: "1.3vh"}}/>
        <div id="calendar">
            <div id="days">{DaysRow()}</div>
            <div style={{height: "0.3vh"}}/>
            <div id="dates">
                {Dates()}
            </div>
        </div>
    </>
    )
}

export default Calendar;