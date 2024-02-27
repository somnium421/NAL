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
    const [showActivityCarousel, setShowActivityCarousel] = useState<boolean>(false);
    const [showLocationCarousel, setShowLocationCarousel] = useState<boolean>(false);
    const [showTimeCarousel, setShowTimeCarousel] = useState<string>("NO"); // NO or STARTS or ENDS

    const ActivityBox = () => (
        <>
        <div className="eventBox activityLocation">
            <input type="text" placeholder="Activity" defaultValue={currentEvent.activity}/>
            <Search className="searchIcon" onClick={() => {
                setShowActivityCarousel(prev => !prev);
                setShowLocationCarousel(false);
                setShowCalendar("NO");
                setShowTimeCarousel("NO");
            }}/>
        </div>
        {showActivityCarousel && 
        <div style={{margin: "1vh -2.1vh"}}><Carousel mode="ACTIVITY" margin={2.1}/></div>
        }
        </>
    );

    const LocationBox = () => (
        <>
        <div className="eventBox activityLocation">
            <input type="text" placeholder="Location" defaultValue={currentEvent.location}/>
            <Search className="searchIcon" onClick={() => {
                setShowLocationCarousel(prev => !prev);
                setShowActivityCarousel(false);
                setShowCalendar("NO");
                setShowTimeCarousel("NO");
            }}/>
        </div>
        {showLocationCarousel && 
        <div style={{margin: "1vh -2.1vh"}}><Carousel mode="LOCATION" margin={2.1}/></div>
        }
        </>
    );

    const TimeBox = () => (
        <div id="timeBox" className="eventBox">
            <div className="timeBoxElem">Starts
                <div>
                    <button onClick={() => {
                        if (showCalendar === "STARTS") setShowCalendar("NO");
                        else setShowCalendar("STARTS");
                        setShowTimeCarousel("NO");
                    }}>2023. 12. 30.</button>
                    <button onClick={() => {
                        if (showTimeCarousel === "STARTS") setShowTimeCarousel("NO");
                        else setShowTimeCarousel("STARTS");
                        setShowCalendar("NO");
                    }}>14:00</button>
                </div>
            </div>
            {showCalendar==="STARTS" && <><hr color="white"/><Calendar showDot={false}/></>}
            {showTimeCarousel==="STARTS" && 
            <>
                <hr color="white"/>
                Hour
                <div style={{height: "0.5vh"}}/>
                <div style={{margin: "0 -2vh"}}><Carousel mode="HOUR" margin={2}/></div>
                <div style={{height: "1vh"}}/>
                Minute
                <div style={{height: "0.5vh"}}/>
                <div style={{margin: "0 -2vh"}}><Carousel mode="MINUTE" margin={2}/></div>
            </>}
            <hr color="white"/>
            <div className="timeBoxElem">Ends
                <div>
                    <button onClick={() => {
                        if (showCalendar === "ENDS") setShowCalendar("NO");
                        else setShowCalendar("ENDS");
                        setShowTimeCarousel("NO");
                    }}>2023. 12. 30.</button>
                    <button onClick={() => {
                        if (showTimeCarousel === "ENDS") setShowTimeCarousel("NO");
                        else setShowTimeCarousel("ENDS");
                        setShowCalendar("NO");
                    }}>15:00</button>
                </div>
            </div>
            {showCalendar==="ENDS" && <><hr color="white"/><Calendar showDot={false}/></>}
            {showTimeCarousel==="ENDS" && 
            <>
                <hr color="white"/>
                <div style={{margin: "0 -2vh"}}><Carousel mode="HOUR" margin={2}/></div>
            </>}
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
                <textarea id="noteBox" className="eventBox" placeholder="Note"/>
            </div>
        </div>
    )
}

export default EventPage;