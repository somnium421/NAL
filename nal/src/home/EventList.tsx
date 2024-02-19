import './EventList.css'
import '../font/font.css'
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
    name: 'Meeting',
    time: ["10:00", "12:00"],
    place: 'Seongsu-dong, Seoul',
    climate: 'sunny',
}
const event2: IEvent = {
    name: 'Jogging',
    time: ["16:00", "17:00"],
    place: 'Banpo, Seoul',
    climate: 'cloudy',
}

const EventList = () => {
    return (
        <div>
            <div id="eventListTitle">TODAY</div>
            <hr id="horizontalLine"></hr>
            <div id="events">
                <Event event={event1}/>
                <Event event={event2}/>
            </div>
        </div>
    )
}

export default EventList;