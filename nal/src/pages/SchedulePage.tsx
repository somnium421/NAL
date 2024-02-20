import './SchedulePage.css'
import Calendar from '../components/Calendar'
import EventList from '../components/EventList'


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