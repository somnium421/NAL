import './SchedulePage.css'
import Calendar from '../components/schedule/Calendar'
import EventList from '../components/common/EventList'
import { ReactComponent as AddButton } from '../svg/ScheduleAdd.svg';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { currentEventState, showEventState } from '../utils/atom';
import { useEffect, useState } from 'react';

const SchedulePage = () => {
    const setShowEvent = useSetRecoilState(showEventState);
    const setCurrentEvent = useSetRecoilState(currentEventState);
    const resetCurrentEvent = useResetRecoilState(currentEventState);
    const [clickedDate, setClickedDate] = useState<Date>(new Date());

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