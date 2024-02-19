import { useState, useEffect } from 'react'
import './Calendar.css'
import { ReactComponent as AddButton } from '../svg/ScheduleAdd.svg'
import { getCurrentLocation } from '../utils/util'
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const daysComponent = () => {
    const content: JSX.Element[] = [];
    for (let i: number = 0; i<7; i++) {
        content.push(<div key={days[i]} className="day">{days[i]}</div>);
    }
    return content;
}

const datesComponent = () => {
    const content: JSX.Element[] = [];

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDate = date.getDate();
    const currentDay = date.getDay();
    const prevDate = new Date(currentYear, currentMonth+1, 0)
    return content;
}

const Calendar = () => {
    const [currentLocationName, setCurrentLocationName] = useState<string>("");
    const now = new Date();

    const location = getCurrentLocation();
    useEffect(() => {
        if (location instanceof Promise) {
            location.then((currentLocation) => {
                setCurrentLocationName(currentLocation.name);
            })
        }
        else setCurrentLocationName(location.name);
    })

    return (
        <div id="calendarBox">
            <div id="currentLocation">{currentLocationName}&nbsp;</div>
            <div id="yearAndMonth">{month[now.getMonth()]+" "+now.getFullYear()}</div>
            <div id="calendar">
                <div id="days">{daysComponent()}</div>
                <div id="dates">
                    {datesComponent()}
                </div>
            </div>
            <div id="addButton">
            <AddButton width="3vh" height="3vh"/>
            </div>
        </div>
    )
}

export default Calendar;