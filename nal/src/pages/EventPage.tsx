import './EventPage.css';
import PageTitle from '../components/common/PageTitle';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentEventState, eventsByDateState, eventsState, showEventState } from '../utils/atom';
import { ReactComponent as Search } from '../svg/Search.svg'
import { useEffect, useRef, useState } from 'react';
import Calendar from '../components/schedule/Calendar';
import Carousel from '../components/common/Carousel';
import { dateToYearMonthDate, dateToHourMinute, yearMonthDateToDate, yearMonthDateHourMinuteToDate, eventsToEventsByDate } from '../utils/util';
import { IEvent } from '../components/common/Event';

const EventPage = () => {
    const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);
    const [showEvent, setShowEvent] = useRecoilState(showEventState);
    const [showCalendar, setShowCalendar] = useState<string>("NO"); // NO or STARTS or ENDS
    const [showActivityCarousel, setShowActivityCarousel] = useState<boolean>(false);
    const [showLocationCarousel, setShowLocationCarousel] = useState<boolean>(false);
    const [showTimeCarousel, setShowTimeCarousel] = useState<string>("NO"); // NO or STARTS or ENDS
    const [events, setEvents] = useRecoilState(eventsState);
    const [eventsByDate, setEventsByDate ] = useRecoilState(eventsByDateState);

    const activityRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLTextAreaElement>(null);

    const [startsDate, setStartsDate] = useState<string>(dateToYearMonthDate(currentEvent.time[0]));
    const [startsHour, setStartsHour] = useState<number>(currentEvent.time[0].getHours());
    const [startsMinute, setStartsMinute] = useState<number>(currentEvent.time[0].getMinutes());
    const [endsDate, setEndsDate] = useState<string>(dateToYearMonthDate(currentEvent.time[1]));
    const [endsHour, setEndsHour] = useState<number>(currentEvent.time[1].getHours());
    const [endsMinute, setEndsMinute] = useState<number>(currentEvent.time[1].getMinutes());

    const ActivityBox = () => (
        <>
        <div className="eventBox activityLocation">
            <input type="text" placeholder="Activity" defaultValue={currentEvent.activity} ref={activityRef}/>
            <Search className="searchIcon" onClick={() => {
                setShowActivityCarousel(prev => !prev);
                setShowLocationCarousel(false);
                setShowCalendar("NO");
                setShowTimeCarousel("NO");
            }}/>
        </div>
        {/* {showActivityCarousel && 
        <div style={{margin: "1vh -2.1vh"}}><Carousel mode="ACTIVITY" margin={2.1}/></div>
        } */}
        </>
    );

    const LocationBox = () => (
        <>
        <div className="eventBox activityLocation">
            <input type="text" placeholder="Location" defaultValue={currentEvent.location} ref={locationRef}/>
            <Search className="searchIcon" onClick={() => {
                setShowLocationCarousel(prev => !prev);
                setShowActivityCarousel(false);
                setShowCalendar("NO");
                setShowTimeCarousel("NO");
            }}/>
        </div>
        {/* {showLocationCarousel && 
        <div style={{margin: "1vh -2.1vh"}}><Carousel mode="LOCATION" margin={2.1}/></div>
        } */}
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
                    }}>{startsDate}</button>
                    <button onClick={() => {
                        if (showTimeCarousel === "STARTS") setShowTimeCarousel("NO");
                        else setShowTimeCarousel("STARTS");
                        setShowCalendar("NO");
                    }}>{`${startsHour}:${String(startsMinute).padStart(2, "0")}`}</button>
                </div>
            </div>
            {showCalendar==="STARTS" &&
            <>
                <hr color="white"/>
                <Calendar onClick={setStartsDate} clickedDate={yearMonthDateToDate(startsDate)} showDot={false}
                          location={locationRef.current?.value===""?"":locationRef.current?.value}/>
            </>}
            {showTimeCarousel==="STARTS" && 
            <>
                <hr color="white"/>
                Hour
                <div style={{height: "0.5vh"}}/>
                <div style={{margin: "0 -2vh"}}><Carousel mode="HOUR" onClick={setStartsHour} clicked={String(startsHour)} margin={2}/></div>
                <div style={{height: "1vh"}}/>
                Minute
                <div style={{height: "0.5vh"}}/>
                <div style={{margin: "0 -2vh"}}><Carousel mode="MINUTE" onClick={setStartsMinute} clicked={String(startsMinute)} margin={2}/></div>
            </>}
            <hr color="white"/>
            <div className="timeBoxElem">Ends
                <div>
                    <button onClick={() => {
                        if (showCalendar === "ENDS") setShowCalendar("NO");
                        else setShowCalendar("ENDS");
                        setShowTimeCarousel("NO");
                    }}>{endsDate}</button>
                    <button onClick={() => {
                        if (showTimeCarousel === "ENDS") setShowTimeCarousel("NO");
                        else setShowTimeCarousel("ENDS");
                        setShowCalendar("NO");
                    }}>{`${endsHour}:${String(endsMinute).padStart(2, "0")}`}</button>
                </div>
            </div>
            {showCalendar==="ENDS" &&
            <>
                <hr color="white"/>
                <Calendar onClick={setEndsDate} clickedDate={yearMonthDateToDate(endsDate)} showDot={false}
                          location={locationRef.current?.value===""?"":locationRef.current?.value}/>
            </>}
            {showTimeCarousel==="ENDS" && 
            <>
                <hr color="white"/>
                Hour
                <div style={{height: "0.5vh"}}/>
                <div style={{margin: "0 -2vh"}}><Carousel mode="HOUR" onClick={setEndsHour} clicked={String(endsHour)} margin={2}/></div>
                <div style={{height: "1vh"}}/>
                Minute
                <div style={{height: "0.5vh"}}/>
                <div style={{margin: "0 -2vh"}}><Carousel mode="MINUTE" onClick={setEndsMinute} clicked={String(endsMinute)} margin={2}/></div>
            </>}
        </div>
    );

    const doneOnClick = () => {
        const tmpEvents = [...events];
        const tmpEvent: IEvent = {
            activity: activityRef.current?.value,
            location: locationRef.current?.value,
            time: [yearMonthDateHourMinuteToDate(startsDate, startsHour, startsMinute), yearMonthDateHourMinuteToDate(endsDate, endsHour, endsMinute)],
            note: noteRef.current?.value,
        }
        if (showEvent === "true" && currentEvent.idx !== undefined) tmpEvents[currentEvent.idx] = tmpEvent;
        else tmpEvents.push(tmpEvent);
        setEvents(tmpEvents);
        setShowEvent("false");
    }

    const deleteOnClick = () => {
        const tmpEvents = [...events];
        if (currentEvent.idx !== undefined) {
            tmpEvents.splice(currentEvent.idx, 1)
            setEvents(tmpEvents);
        }
        setShowEvent("false");
    }

    useEffect(() => {
        if (events) setEventsByDate(eventsToEventsByDate(events));
    }, [events]);

    return (
        <div id="eventPage" className="page">
            <PageTitle pageTitleMode="EVENT" onClickRight={doneOnClick}/>
            <div id="eventPageContent">
                <div style={{height: "5vh"}}/>
                {ActivityBox()}
                <div style={{height: "1vh"}}/>
                {LocationBox()}
                <div style={{height: "1vh"}}/>
                {TimeBox()}
                <div style={{height: "1vh"}}/>
                <textarea id="noteBox" className="eventBox" placeholder="Note" defaultValue={currentEvent.note} ref={noteRef}/>
                <div id="deleteEvent" onClick={deleteOnClick}>Delete Event</div>
            </div>
        </div>
    )
}

export default EventPage;