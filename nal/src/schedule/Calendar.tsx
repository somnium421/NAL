import './Calendar.css'
import { ReactComponent as AddButton } from '../svg/ScheduleAdd.svg';

const daysComponent = () => {
    const days: string[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const content: JSX.Element[] = [];
    for (let i: number = 0; i<7; i++) {
        content.push(<div className="day">{days[i]}</div>);
    }
    return content
}

const Calendar = () => {
    return (
        <div id="calendarBox">
            <div id="currentLocation">
                Gimpo-si
            </div>
            <div id="yearAndMonth">
                January 2023
            </div>
            <div id="calendar">
                <div id="days">{daysComponent()}</div>
            </div>
            <div id="addButton">
            <AddButton width="3vh" height="3vh"/>
            </div>
        </div>
    )
}

export default Calendar;