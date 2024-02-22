import './Event.css';
import { useRecoilState } from 'recoil';
import { currentEventState, showEventState } from '../../utils/atom';

export interface IEvent {
    activity: string;
    time: [string, string];
    location: string;
    climate: string;
}

interface Props {
    event: IEvent;
}

const event: IEvent = {
    activity: 'Jogging',
    time: ["16:00", "17:00"],
    location: 'Banpo, Seoul',
    climate: 'cloudy',
}

const Event = (props: Props) => {
    const [showEvent, setShowEvent] = useRecoilState(showEventState);
    const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);

    return (
        <li className="event" onClick={() => {
            setCurrentEvent(event);
            setShowEvent(true);
        }}>
            <div>
                <div className="eventActivity">{props.event.activity}</div>
                <div className="eventLocation">{props.event.location}</div>
            </div>
            <div>
                <div className="eventTime">{props.event.time[0]}</div>
                <div className="eventTime">{props.event.time[1]}</div>
            </div>
        </li>
    )
}

export default Event;