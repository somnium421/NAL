import './UpcomingEvents.css'
import EventList from './EventList'

const UpcomingEvents = () => {
    return (
        <div id="upcomingEvents">
            <div>
                <div id="upcomingEventsTitle">Upcoming Events</div>
                <EventList/>
            </div>
        </div>
    )
}

export default UpcomingEvents;