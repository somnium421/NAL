import './EventPage.css';
import PageTitle from '../components/common/PageTitle';
import { useRecoilState } from 'recoil';
import { currentEventState } from '../utils/atom';
import { ReactComponent as Search } from '../svg/Search.svg'
import { useState } from 'react';
import Calendar from '../components/schedule/Calendar';

const EventPage = () => {
    const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);
    const [showStartsCalendar, setShowStartsCalendar] = useState<boolean>(false);
    const [showEndsCalendar, setShowEndsCalendar] = useState<boolean>(false);

    return (
        <div id="eventPage" className="page">
            <PageTitle pageTitleMode="EVENT"/>
            <div id="eventPageContent">
                <div style={{height: "5vh"}}/>
                <div className="eventBox activityLocation">
                    <input type="text" placeholder="Activity" defaultValue={currentEvent.activity}/>
                    <Search className="searchIcon"/>
                </div>
                <div style={{height: "1vh"}}/>
                <div className="eventBox activityLocation">
                    <input type="text" placeholder="Location" defaultValue={currentEvent.location}/>
                    <Search className="searchIcon"/>
                </div>
                
                <div style={{height: "1vh"}}/>
                <div id="eventStartsEnds" className="eventBox">
                    <div className="eventStartsEnds">Starts
                        <div>
                            <button onClick={() => setShowStartsCalendar(true)}>2023. 12. 30.</button>
                            <button>14:00</button>
                        </div>
                    </div>
                    {showStartsCalendar && <Calendar/>}
                    <hr color="white"/>
                    <div className="eventStartsEnds">Ends
                        <div>
                            <button>2023. 12. 30.</button>
                            <button>15:00</button>
                        </div>
                    </div>
                </div>
                <div style={{height: "1vh"}}/>
                <textarea id="noteBox" className="eventBox" placeholder="Note"/>
            </div>
        </div>
    )
}

export default EventPage;