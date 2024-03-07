import './EventList.css'
import Event from './Event'
import { useRecoilState, useRecoilValue } from 'recoil';
import { eventsByDateState, eventsState, modeState } from '../../utils/atom';
import { dateToYearMonthDateNumber, eventsToEventsByDate, numberToMonthDateYear } from '../../utils/util';
import { useEffect, useState } from 'react';

interface Props {
    date?: Date;
}

const EventList = (props: Props) => {
    const {date = new Date()} = props;
    const events = useRecoilValue(eventsState);
    const [eventsByDate, setEventsByDate] = useRecoilState(eventsByDateState);
    const mode = useRecoilValue(modeState);
    const [closestNextDate, setClosestNextDate] = useState<number>(0);
    
    useEffect(() => {
        let tmp = 99999999;
        Object.keys(eventsByDate).forEach(key => {
            if (parseInt(key) < tmp && dateToYearMonthDateNumber(new Date()) <= parseInt(key)) tmp = parseInt(key);
        });    
        setClosestNextDate(tmp);
    }, [eventsByDate]);

    const eventListTitle = () => {
        let title: string;

        if (dateToYearMonthDateNumber(new Date()) === closestNextDate) title = "Today";
        else if (dateToYearMonthDateNumber(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1)) === closestNextDate) title = "Tomorrow";
        else title = numberToMonthDateYear(closestNextDate);

        return <>
            <div className="eventListTitle">{title}</div>
            <hr style={{borderColor: "black"}}/>
        </>
    }
    
    return (
        <div>
            {mode === "HOME" && eventListTitle()}
            <ol id="events">
            {eventsByDate[mode === "HOME"?closestNextDate:dateToYearMonthDateNumber(date)]?.map(item => 
                <Event key={item[0]} idx={item[0]} timeMode={item[1]}/>)}
            </ol>
        </div>
    )
}

export default EventList;