import { useState, useEffect } from 'react'
import './Calendar.css'
import { ReactComponent as AddButton } from '../svg/ScheduleAdd.svg'
import { getCurrentLocation, getMonthlyWeather } from '../utils/util'
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

const DatesRows = () => {
    const content: JSX.Element[] = [];   
    const prevLastDate = new Date(currentYear, currentMonth, 0).getDate();
    const currentLastDay = new Date(currentYear, currentMonth+1, 0).getDay();

    return content;
}

const Calendar = () => {
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
        <div id="calendarBox">
            <div id="currentLocation">{currentLocationName}&nbsp;</div>
            <div id="yearAndMonth">{month[currentMonth]+" "+currentYear}</div>
            <div id="calendar">
                <div id="days">{DaysRow()}</div>
                <div id="dates">
                    {DatesRows()}
                </div>
            </div>
            <div id="addButton">
            <AddButton width="3vh" height="3vh"/>
            </div>
        </div>
    )
}

export default Calendar;