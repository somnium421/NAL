import './SchedulePage.css'
import Calendar from '../components/schedule/Calendar'
import EventList from '../components/common/EventList'
import { ReactComponent as AddButton } from '../svg/ScheduleAdd.svg';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { currentEventState, showEventState } from '../utils/atom';

const SchedulePage = () => {
    const [showEvent, setShowEvent] = useRecoilState(showEventState);
    const resetCurrentEvent = useResetRecoilState(currentEventState);
    return (
        <div id="schedulePage" className="page">
            <div id="calendarBox"><Calendar showDot={true}/></div>
            <div id="eventList"><EventList/></div>
            <AddButton id="addButton" onClick={()=> {
                    resetCurrentEvent();
                    setShowEvent(true);
            }}/>
        </div>
    )
}

export default SchedulePage;