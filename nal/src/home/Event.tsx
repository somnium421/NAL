import './Event.css'

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
    return (
        <div className="event" onClick={() => {
            console.log('hi')
        }}>
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