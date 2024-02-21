import './EventList.css'
import Event, { IEvent } from './Event'


interface IDailyEvents {
    date: number;
    events: IEvent[];
}

const dailyEvents: IDailyEvents = {
    date: 0,
    events: [],
}

const event1: IEvent = {
    activity: 'Meeting',
    time: ["10:00", "12:00"],
    location: 'Seongsu-dong, Seoul',
    climate: 'sunny',
}
const event2: IEvent = {
    activity: 'Jogging',
    time: ["16:00", "17:00"],
    location: 'Banpo, Seoul',
    climate: 'cloudy',
}

const EventList = () => {
    return (
        <div>
            <div className="eventListTitle">TODAY</div>
            <hr className="horizontalLine"></hr>
            <div id="events">
                <Event event={event1}/>
                <Event event={event2}/>
            </div>
        </div>
    )
}

export default EventList;