import './Event.css';
import { useRecoilState } from 'recoil';
import { currentEventState, showEventState } from '../../utils/atom';
import { dateToHourMinute } from '../../utils/util';

export interface IEvent  {
    activity?: string;
    time: [Date, Date];
    location?: string;
    note?: string;
    climate?: string;
}

const Event = (props: IEvent) => {
    const [showEvent, setShowEvent] = useRecoilState(showEventState);
    const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);

    return (
        <li className="event" onClick={() => {
            setCurrentEvent(props);
            setShowEvent(true);
        }}>
            <div>
                <div className="eventActivity">{props.activity}</div>
                <div className="eventLocation">{props.location}</div>
            </div>
            <div>
                <div className="eventTime">{dateToHourMinute(props.time[0])}</div>
                <div className="eventTime">{dateToHourMinute(props.time[1])}</div>
            </div>
        </li>
    )
}

export default Event;