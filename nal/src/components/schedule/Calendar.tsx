import { useState, useEffect } from 'react';
import './Calendar.css';
import { getCurrentLocation, getMonthlyWeather } from '../../utils/util';
import Rain from '../../img/Rain.png';

const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const date = today.getDate();

interface Props {
    showDot: boolean;
    // setClickedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DaysRow = () => {
    const content: JSX.Element[] = [];
    for (let i: number = 0; i<7; i++) {
        content.push(<div key={days[i]} className="day">{days[i]}</div>);
    }
    return content;
}

const Dates = (showWeather: boolean, showDot: boolean) => {
    const [clickedDate, setClickedDate] = useState<number | null>(date);

    const dates: (number | null)[] = [];
    for (let i:number = 0; i<new Date(year, month, 1).getDay(); i++) dates.push(null);
    for (let i:number = 1; i<=new Date(year, month+1, 0).getDate(); i++) dates.push(i);
    while (dates.length%7) dates.push(null);

    let content:JSX.Element[] = [];

    for (let row:number = 0; row<dates.length/7; row++) {
        if (row) content.push(<hr key={row} className="calendarLine"></hr>)
        content.push(<div key={"row"+row} className="datesRow">
            {dates.slice(row*7, (row+1)*7).map((item, idx) => {
                const key = row*7+idx;
                let className = "dateComp";
                if (dates[key]===null) className += " null";
                else if (dates[key]===date) className += " today";
                if (dates[key]===clickedDate) className += " clicked";
                return (
                    <div key={"date"+key} className={className} onClick={() => {
                        if (typeof dates[key] === "number") setClickedDate(dates[key]);
                    }}>
                        {dates[key]
                        ?<><img src={Rain} alt="" className="calendarWeatherIcon"/>
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

const Calendar = ({showWeather = true, showDot = true,}) => {
    const [currentLocationName, setCurrentLocationName] = useState<string>("");
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
        <>
            <div id="currentLocation">{currentLocationName}&nbsp;</div>
            <div style={{height: "0.4vh"}}/>
            <div id="yearAndMonth">{monthList[month%12]+" "+year}</div>
            <div style={{height: "1.3vh"}}/>
            <div id="calendar">
                <div id="days">{DaysRow()}</div>
                <div style={{height: "0.3vh"}}/>
                <div id="dates">
                    {Dates(showWeather, showDot)}
                </div>
            </div>
        </>
    )
}

export default Calendar;