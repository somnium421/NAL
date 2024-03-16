import './SchedulePage.css'
import Calendar from '../components/schedule/Calendar'
import EventList from '../components/common/EventList'
import { ReactComponent as AddButton } from '../svg/ScheduleAdd.svg';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { currentEventState, eventsState, showEventState } from '../utils/atom';
import { useEffect, useState } from 'react';
import { eventsToEventsByDate } from '../utils/util';

const SchedulePage = () => {
    const [showEvent, setShowEvent] = useRecoilState(showEventState);
    const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);
    const [clickedDate, setClickedDate] = useState<Date>(new Date());
    const resetCurrentEvent = useResetRecoilState(currentEventState);
    useEffect(() => resetCurrentEvent(), []);

    return (
        <div id="schedulePage" className="page">
            <div id="calendarBox"><Calendar onClick={setClickedDate}/></div>
            <div style={{height: "1vh"}}/>
            <div id="eventList"><EventList date={clickedDate}/></div>
            <AddButton id="addButton" onClick={()=>{
                setCurrentEvent({
                    time: [new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate(), new Date().getHours()+1), 
                           new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate(), new Date().getHours()+2)],
                });
                setShowEvent("new");
            }}/>
        </div>
    )
}

export default SchedulePage;