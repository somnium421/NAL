import './SchedulePage.css'
import Calendar from '../components/schedule/Calendar'
import EventList from '../components/common/EventList'

const SchedulePage = () => {
    return (
        <div id="schedulePage" className="page">
            <Calendar/>
            <div id="eventList">
                <EventList/>
            </div>
        </div>
    )
}

export default SchedulePage;