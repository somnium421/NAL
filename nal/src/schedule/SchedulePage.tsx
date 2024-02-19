import './SchedulePage.css'
import Calendar from './Calendar'
import EventList from '../home/EventList'


const SchedulePage = () => {
    return (
        <div id="schedulePage">
            <Calendar/>
            <div id="eventList">
                <EventList/>
            </div>
        </div>
    )
}

export default SchedulePage;