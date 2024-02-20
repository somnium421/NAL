import './Event.css';
import { useRecoilState } from 'recoil';
import { modiModeState } from '../utils/atom';

export interface IEvent {
    name: string;
    time: [string, string];
    place: string;
    climate: string;
}

interface Props {
    event: IEvent;
}

const Event = (props: Props) => {
    const [modiMode, setModiMode] = useRecoilState(modiModeState);
    return (
        <div className="event" onClick={()=>setModiMode(true)}>
            <div className="eventNameIconLocation">
                <div className="eventName">{props.event.name}</div>
                <div className="eventLocation">{props.event.place}</div>
            </div>
            <div>
                <div className="eventTime">{props.event.time[0]}</div>
                <div className="eventTime">{props.event.time[1]}</div>
            </div>
        </div>
    )
}

export default Event;