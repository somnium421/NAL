import './EventList.css'
import Event from './Event'
import { useRecoilValue } from 'recoil';
import { eventsByDateState, eventsState } from '../../utils/atom';

const EventList = () => {
    const events = useRecoilValue(eventsState);
    const eventsByDate = useRecoilValue(eventsByDateState);

    console.log(Object.keys(eventsByDate));

    return (
        <div>
            <div className="eventListTitle">Tomorrow</div>
            <hr style={{borderColor: "black"}}/>
            <ol id="events">{events?.map((event, idx) => {
                return <Event key={idx} activity={event.activity} time={event.time} location={event.location} note={event.note} climate={event.climate}></Event>
            })}</ol>
        </div>
    )
}

export default EventList;