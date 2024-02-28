import './EventList.css'
import Event from './Event'
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { eventsState } from '../../utils/atom';

interface JSONEvent {
    activity: string;
    time: [[string, string, string], [string, string, string]];
    location: string;
    note: string;
    climate: string;
}

const EventList = () => {
    const [events, setEvents] = useRecoilState(eventsState);

    useEffect(() => {
        fetch("/schedule.json")
        .then(response => response.json())
        .then(items => {
            const date = new Date();
            setEvents(items.map((item: JSONEvent) => ({
                    activity: item.activity,
                    time: [new Date(date.getFullYear(), date.getMonth(), date.getDate()+parseInt(item.time[0][0]), parseInt(item.time[0][1]), parseInt(item.time[0][2])), 
                           new Date(date.getFullYear(), date.getMonth(), date.getDate()+parseInt(item.time[1][0]), parseInt(item.time[1][1]), parseInt(item.time[1][2]))],
                    location: item.location,
                    note: item.note,
                    climate: item.climate,
                })
            ));
        });
    }, [])

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