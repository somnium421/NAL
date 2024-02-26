import './EventPage.css';
import PageTitle from '../components/common/PageTitle';
import { useRecoilState } from 'recoil';
import { currentEventState } from '../utils/atom';
import { ReactComponent as Search } from '../svg/Search.svg'
import { useState } from 'react';
import Calendar from '../components/schedule/Calendar';
import Carousel from '../components/common/Carousel';

const EventPage = () => {
    const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);
    const [showCalendar, setShowCalendar] = useState<string>("NO"); // NO or STARTS or ENDS

    const ActivityBox = () => (
        <div className="eventBox activityLocation">
            <input type="text" placeholder="Activity" defaultValue={currentEvent.activity}/>
            <Search className="searchIcon"/>
        </div>
    );

    const LocationBox = () => (
        <div className="eventBox activityLocation">
            <input type="text" placeholder="Location" defaultValue={currentEvent.location}/>
            <Search className="searchIcon"/>
        </div>
    );

    const TimeBox = () => (
        <div id="timeBox" className="eventBox">
            <div className="timeBoxElem">Starts
                <div>
                    <button onClick={() => {
                        if (showCalendar === "STARTS") setShowCalendar("NO");
                        else setShowCalendar("STARTS");
                    }}>2023. 12. 30.</button>
                    <button>14:00</button>
                </div>
            </div>
            {showCalendar==="STARTS" && <Calendar showDot={false}/>}
            <hr color="white"/>
            <div className="timeBoxElem">Ends
                <div>
                    <button onClick={() => {
                        if (showCalendar === "ENDS") setShowCalendar("NO");
                        else setShowCalendar("ENDS");
                    }}>2023. 12. 30.</button>
                    <button>15:00</button>
                </div>
            </div>
            {showCalendar==="ENDS" && <Calendar showDot={false}/>}
        </div>
    );

    return (
        <div id="eventPage" className="page">
            <PageTitle pageTitleMode="EVENT"/>
            <div id="eventPageContent">
                <div style={{height: "5vh"}}/>
                {ActivityBox()}
                <div style={{height: "1vh"}}/>
                {LocationBox()}
                <div style={{height: "1vh"}}/>
                {TimeBox()}
                <div style={{height: "1vh"}}/>
                
                <Carousel/>

                <div style={{height: "1vh"}}/>
                <textarea id="noteBox" className="eventBox" placeholder="Note"/>
            </div>
        </div>
    )
}

export default EventPage;