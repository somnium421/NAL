import './SchedulePage.css'
import Calendar from '../components/schedule/Calendar'
import EventList from '../components/common/EventList'
import { ReactComponent as AddButton } from '../svg/ScheduleAdd.svg';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { currentEventState, showEventState } from '../utils/atom';
import { useEffect } from 'react';

const SchedulePage = () => {
    const [showEvent, setShowEvent] = useRecoilState(showEventState);
    const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);
    const resetCurrentEvent = useResetRecoilState(currentEventState);
    useEffect(() => resetCurrentEvent(), []);

    return (
        <div id="schedulePage" className="page">
            <div id="calendarBox"><Calendar onClick={setCurrentEvent}/></div>
            <div id="eventList"><EventList/></div>
            <AddButton id="addButton" onClick={()=>setShowEvent(true)}/>
        </div>
    )
}

export default SchedulePage;