import React, { useState, useEffect } from 'react';
import './Calendar.css';
import { DateWeather, dateToYearMonthDateNumber, getCurrentLocation, getDateWeather, isSameDate } from '../../utils/util';
import { ReactComponent as Clear } from '../../svg/Clear.svg';
import { ReactComponent as Rain } from '../../svg/Rain.svg';
import { ReactComponent as Snow } from '../../svg/Snow.svg';
import { ReactComponent as Clouds } from '../../svg/Clouds.svg';
import { useRecoilValue } from 'recoil';
import { eventsByDateState, eventsState, showEventState } from '../../utils/atom';
import { ReactComponent as Arrow } from "../../svg/Arrow.svg";
const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface Props {
    onClick: React.Dispatch<React.SetStateAction<any>>;
    showWeather?: boolean;
    showDot?: boolean;
    clickedDate?: Date;
    location?: string;
}

const DaysRow = () => {
    const content: JSX.Element[] = [];
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    for (let i: number = 0; i<7; i++) {
        content.push(<div key={days[i]} className="day">{days[i]}</div>);
    }
    return content;
}

const Calendar = (props: Props) => {
    const {onClick, showWeather = true, showDot = true, clickedDate = new Date()} = props;
    const location = getCurrentLocation();
    const showEvent = useRecoilValue(showEventState);
    const events = useRecoilValue(eventsState);
    const eventsByDate = useRecoilValue(eventsByDateState);
    const [calendarClickedDate, setCalendarClickedDate] = useState<Date>(clickedDate);
    const [currentLocationName, setCurrentLocationName] = useState<string>("");
    const [year, setYear] = useState<number>(clickedDate.getFullYear());
    const [month, setMonth] = useState<number>(clickedDate.getMonth());
    const [isEventsByDateReady, setIsEventsByDateReady] = useState<boolean>(false);

    const CalendarDots = (date: Date, clicked: boolean) => {
        let content:JSX.Element[] = [];
        if (eventsByDate[dateToYearMonthDateNumber(date)]) {
            const totalN = Math.min(3, eventsByDate[dateToYearMonthDateNumber(date)].length);
            let modifyN = 0;
            eventsByDate[dateToYearMonthDateNumber(date)].forEach((item) => {
                if (events[item.idx].modify !== "No") modifyN++;
            });
            modifyN = Math.min(3, modifyN);
            for (let i: number = 0; i < totalN; i++) {
                let dotColor = "lightgray";
                if (!clicked && i<modifyN && new Date() < date) dotColor = "var(--purple)"; 
                content.push(<div key={i} style={{backgroundColor: dotColor}} className="calendarDot"/>);
            }
        }
        return (<div className="calendarDots">{content}</div>)
    };

    const CalendarWeatherIcon = (date: Date, clicked: boolean) => {
        const dateWeather = getDateWeather(date) as DateWeather;
        const iconColor = clicked?"lightgray":"gray";
        switch (dateWeather.main) {
            case "Clear": return <Clear style={{color: iconColor}} className="calendarWeatherIcon"/>;
            case "Rain": return <Rain style={{color: iconColor}} className="calendarWeatherIcon"/>;
            case "Clouds": return <Clouds style={{color: iconColor}} className="calendarWeatherIcon"/>;
            case "Snow": return <Snow style={{color: iconColor}} className="calendarWeatherIcon"/>;
            case "No": return <div style={{height: "1.6vh"}}/>
        }
    };

    const Dates = () => {
        let content:JSX.Element[] = [];
        const dates: number[] = [];
        for (let i:number = 0; i<new Date(year, month, 1).getDay(); i++) dates.push(0);
        for (let i:number = 1; i<=new Date(year, month+1, 0).getDate(); i++) dates.push(i);
        while (dates.length%7) dates.push(0);
    
        for (let row:number = 0; row<dates.length/7; row++) {
            if (row) content.push(<hr key={row} className="calendarLine"/>)
            content.push(<div key={"row"+row} className="datesRow">
                {dates.slice(row*7, (row+1)*7).map((item, idx) => {
                    const key = row*7+idx;
                    let className = "dateComp";
                    if (dates[key] === 0) className += " null";
                    else if (isSameDate(calendarClickedDate, new Date(year, month, dates[key]))) className += " clicked";
                    else if (isSameDate(new Date(), new Date(year, month, dates[key]))) className += " today";
                    return (
                        <div key={"date"+key} className={className} onClick={() => {
                            if (dates[key] !== 0) {
                                setCalendarClickedDate(new Date(year, month, dates[key]));
                                if (showEvent!=="false") onClick(new Date(year, month, dates[key]));
                                else onClick(new Date(year, month, dates[key]));
                        }}}>
                            {dates[key] !== 0
                            ?<>
                            {showWeather && CalendarWeatherIcon(new Date(year, month, dates[key]), isSameDate(calendarClickedDate, new Date(year, month, dates[key])))}
                            <div>{dates[key]}</div>
                            {showDot && CalendarDots(new Date(year, month, dates[key]), isSameDate(calendarClickedDate, new Date(year, month, dates[key])))}
                            </>
                            :<div>&nbsp;</div>}
                        </div>
                    )
                })}
            </div>);
        }
        return content;
    };

    const onClickArrow = (direction: number) => {
        const newDate = new Date(year, month+direction, 1);
        if (showEvent==="false") onClick(newDate);
        setYear(newDate.getFullYear());
        setMonth(newDate.getMonth());
    }

    useEffect(() => {
        if (props.location && props.location !== "") setCurrentLocationName(props.location);
        else if (location instanceof Promise) {
            location
            .then(currentLocation => setCurrentLocationName(currentLocation.name));
        }
        else setCurrentLocationName(location.name);
    }, []);

    useEffect(() => {
        if (eventsByDate) setIsEventsByDateReady(true);
    }, [eventsByDate]);

    return (
    <>
        <div id="currentLocation">{currentLocationName}&nbsp;</div>
        <div style={{height: "0.4vh"}}/>
        <div id="yearMonthArrows">
            <div id="yearMonth">{monthList[month%12]+" "+year}</div>
            <div>
                <Arrow id="prevMonth" className="calendarArrow" onClick={() => {onClickArrow(-1)}}/>
                <Arrow id="nextMonth" className="calendarArrow" onClick={() => {onClickArrow(1)}}/>
            </div>
        </div>
        <div style={{height: "1.3vh"}}/>
        <div id="calendar">
            <div id="days">{DaysRow()}</div>
            <div style={{height: "0.3vh"}}/>
            <div id="dates">
                {isEventsByDateReady && Dates()}
            </div>
        </div>
    </>
    )
}

export default Calendar;