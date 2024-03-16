import './EventPage.css';
import PageTitle from '../components/fund/PageTitle';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentEventState, eventsByDateState, eventsState, notificationState, showEventState } from '../utils/atom';
import { useEffect, useRef, useState } from 'react';
import Calendar from '../components/schedule/Calendar';
import Carousel from '../components/common/Carousel';
import { getEventWeather, dateToYearMonthDate, eventsToEventsByDate, eventsToNotification, checkEventsModify } from '../utils/util';
import { IEvent } from '../components/common/Event';

const EventPage = () => {
    const currentEvent = useRecoilValue(currentEventState);
    const [showEvent, setShowEvent] = useRecoilState(showEventState);
    const [events, setEvents] = useRecoilState(eventsState);
    const setEventsByDate = useSetRecoilState(eventsByDateState);
    const setNotification = useSetRecoilState(notificationState);
    const [showCalendar, setShowCalendar] = useState<string>("NO"); // NO or STARTS or ENDS
    const [showTimeCarousel, setShowTimeCarousel] = useState<string>("NO"); // NO or STARTS or ENDS

    const [activityValue, setActivityValue] = useState<string>(currentEvent.activity?currentEvent.activity:"");
    const [locationValue, setLocationValue] = useState<string>(currentEvent.location?currentEvent.location:"")
    const [pageTitleRightclickAvailable, setPageTitleRightClickAvailable] = useState<boolean>(activityValue!=="");
    const [startsDate, setStartsDate] = useState<Date>(currentEvent.time[0]);
    const [startsHour, setStartsHour] = useState<number>(currentEvent.time[0].getHours());
    const [startsMinute, setStartsMinute] = useState<number>(currentEvent.time[0].getMinutes());
    const [endsDate, setEndsDate] = useState<Date>(currentEvent.time[1]);
    const [endsHour, setEndsHour] = useState<number>(currentEvent.time[1].getHours());
    const [endsMinute, setEndsMinute] = useState<number>(currentEvent.time[1].getMinutes());
    const [eventWeather, setEventWeather] = useState<string>("No");
    const [goBack, setGoBack] = useState<boolean>(false);
    const noteRef = useRef<HTMLTextAreaElement>(null);
    const endsDateButtonRef = useRef<HTMLButtonElement>(null);
    const endsHourMinuteButtonRef = useRef<HTMLButtonElement>(null);

    const closeAll = () => {
        setShowCalendar("NO");
        setShowTimeCarousel("NO");
    }
    const Alert = () => {
        return <>{eventWeather !== "No" && new Date() < endsDate &&
               <><div className="alert">{eventWeather} is expected during that time</div>
               <div style={{height: "1vh"}}/></>
        }</>
    };
    const ActivityBox = () => (
        <div className="eventBox activityLocation">
            <input type="text" placeholder="Activity" defaultValue={activityValue} 
             onChange={(e)=> setActivityValue(e.target.value)} onFocus={closeAll}/>
        </div>
    );
    const LocationBox = () => (
        <div className="eventBox activityLocation">
            <input type="text" placeholder="Location" defaultValue={locationValue} 
             onChange={(e)=> setLocationValue(e.target.value)} onFocus={closeAll}/>
        </div>
    );
    const TimeBox = () => (
        <div id="timeBox" className="eventBox">
            <div className="timeBoxElem">Starts
                <div>
                    <button onClick={() => {
                        if (showCalendar === "STARTS") closeAll();
                        else {closeAll(); setShowCalendar("STARTS");}
                    }}>{dateToYearMonthDate(startsDate)}</button>
                    <button onClick={() => {
                        if (showTimeCarousel === "STARTS") closeAll();
                        else {closeAll(); setShowTimeCarousel("STARTS");}
                    }}>{`${startsHour}:${String(startsMinute).padStart(2, "0")}`}</button>
                </div>
            </div>
           {showCalendar==="STARTS" &&
            <>
                <hr color="white"/>
                <Calendar onClick={setStartsDate} clickedDate={startsDate} showDot={false}
                          location={locationValue}/>
            </>}
            {showTimeCarousel==="STARTS" && 
            <>
                <hr color="white"/>
                Hour
                <div style={{height: "0.5vh"}}/>
                <div style={{margin: "0 -2vh"}}><Carousel mode="HOUR" onClick={setStartsHour} clicked={String(startsHour)} margin={2} date={startsDate}/></div>
                <div style={{height: "1vh"}}/>
                Minute
                <div style={{height: "0.5vh"}}/>
                <div style={{margin: "0 -2vh"}}><Carousel mode="MINUTE" onClick={setStartsMinute} clicked={String(startsMinute)} margin={2}/></div>
            </>}
            <hr color="white"/>
            <div className="timeBoxElem">Ends
                <div>
                    <button ref={endsDateButtonRef} onClick={() => {
                        if (showCalendar === "ENDS") closeAll();
                        else {closeAll(); setShowCalendar("ENDS");}
                    }}>{dateToYearMonthDate(endsDate)}</button>
                    <button ref={endsHourMinuteButtonRef} onClick={() => {
                        if (showTimeCarousel === "ENDS") closeAll();
                        else {closeAll(); setShowTimeCarousel("ENDS");}
                    }}>{`${endsHour}:${String(endsMinute).padStart(2, "0")}`}</button>
                </div>
            </div>
            {showCalendar==="ENDS" &&
            <>
                <hr color="white"/>
                <Calendar onClick={setEndsDate} clickedDate={endsDate} showDot={false}
                          location={locationValue}/>
            </>}
            {showTimeCarousel==="ENDS" && 
            <>
                <hr color="white"/>
                Hour
                <div style={{height: "0.5vh"}}/>
                <div style={{margin: "0 -2vh"}}><Carousel mode="HOUR" onClick={setEndsHour} clicked={String(endsHour)} margin={2} date={endsDate}/></div>
                <div style={{height: "1vh"}}/>
                Minute
                <div style={{height: "0.5vh"}}/>
                <div style={{margin: "0 -2vh"}}><Carousel mode="MINUTE" onClick={setEndsMinute} clicked={String(endsMinute)} margin={2}/></div>
            </>}
        </div>
    );
    const doneOnClick = () => {
        const tmpEvents = [...events];
        const startsTime = new Date(startsDate.getFullYear(), startsDate.getMonth(), startsDate.getDate(), startsHour, startsMinute);
        const endsTime = new Date(endsDate.getFullYear(), endsDate.getMonth(), endsDate.getDate(), endsHour, endsMinute);
        const tmpEvent: IEvent = {activity: activityValue, location: locationValue, time: [startsTime, endsTime], note: noteRef.current?.value,};
        checkEventsModify([tmpEvent])
        .then((event) => {
            if (showEvent === "true" && currentEvent.idx !== undefined) tmpEvents[currentEvent.idx] = event[0];
            else tmpEvents.push(event[0]);
            setEvents(tmpEvents);
            setEventsByDate(eventsToEventsByDate(tmpEvents));
            setNotification(eventsToNotification(tmpEvents));
            setGoBack(true);
        })        
    };
    const deleteOnClick = () => {
        if (currentEvent.idx !== undefined) {
            const tmpEvents = [...events];
            tmpEvents.splice(currentEvent.idx, 1)
            setEvents(tmpEvents);
            setEventsByDate(eventsToEventsByDate(tmpEvents));
            setNotification(eventsToNotification(tmpEvents));
            setGoBack(true);
        }
    };
    useEffect(() => {
        if (events) setEventsByDate(eventsToEventsByDate(events));
        if (goBack) setShowEvent("false"); 
    }, [events]);
    useEffect(() => {
        const startsTime = new Date(startsDate.getFullYear(), startsDate.getMonth(), startsDate.getDate(), startsHour, startsMinute);
        const endsTime = new Date(endsDate.getFullYear(), endsDate.getMonth(), endsDate.getDate(), endsHour, endsMinute);

        if (startsTime < endsTime) {
            endsDateButtonRef.current?.style.setProperty("text-decoration", "none");
            endsHourMinuteButtonRef.current?.style.setProperty("text-decoration", "none");
            setEventWeather(getEventWeather(startsTime, endsTime));
        }
        else {
            endsDateButtonRef.current?.style.setProperty("text-decoration", "line-through");
            endsHourMinuteButtonRef.current?.style.setProperty("text-decoration", "line-through");
            setEventWeather("No");
        }
        if (activityValue !== "" && startsTime < endsTime) setPageTitleRightClickAvailable(true);                
        else setPageTitleRightClickAvailable(false);
    }, [startsDate, startsHour, startsMinute, endsDate, endsHour, endsMinute, activityValue]);

    return (
        <div id="eventPage" className="page">
            <PageTitle pageTitleMode="EVENT" onClickRight={doneOnClick} rightClickAvailable={pageTitleRightclickAvailable}/>
            <div id="eventPageContent">
                <div style={{height: "5vh"}}/>
                {Alert()}
                {ActivityBox()}
                <div style={{height: "1vh"}}/>
                {LocationBox()}
                <div style={{height: "1vh"}}/>
                {TimeBox()}
                <div style={{height: "1vh"}}/>
                <textarea id="noteBox" className="eventBox" placeholder="Note" defaultValue={currentEvent.note} ref={noteRef}/>
                <div style={{height: showEvent==="true"?"11vh":"8vh"}}/>
            </div>
            {showEvent==="true" && <div id="deleteEvent" onClick={deleteOnClick}>Delete Event</div>}
        </div>
    )
}

export default EventPage;