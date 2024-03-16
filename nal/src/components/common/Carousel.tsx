import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './Carousel.css';
import { ReactComponent as Clear } from '../../svg/Clear.svg';
import { ReactComponent as Rain } from '../../svg/Rain.svg';
import { ReactComponent as Snow } from '../../svg/Snow.svg';
import { ReactComponent as Clouds } from '../../svg/Clouds.svg';
import Shopping from '../../img/Shopping.jpg';
import { DateWeather, getDateWeather, getHourlyWeather } from '../../utils/util';

interface Props {
    mode: string; // ACTIVITY or LOCATION or HOUR or MINUTE
    margin: number;
    onClick: React.Dispatch<React.SetStateAction<any>>;
    clicked?: string;
    date?: Date;
}

const ActivityCarouselItems = (props: Props) => {
    const content: JSX.Element[] = [];
    return (
        <>
        <div className="activityCarouselItem">
            <img src={Shopping} alt="" className="activityCarouselImg"/>
            <div className="carouselTitle">Shopping</div>
            <div className="carouselBody">Daejeon Mall</div>
        </div>
        <div className="activityCarouselItem">
            <img src={Shopping} alt="" className="activityCarouselImg"/>
            <div className="carouselTitle">Shopping</div>
            <div className="carouselBody">Daejeon Mall</div>
        </div>
        <div className="activityCarouselItem">
            <img src={Shopping} alt="" className="activityCarouselImg"/>
            <div className="carouselTitle">Shopping</div>
            <div className="carouselBody">Daejeon Mall</div>
        </div>
        <div className="activityCarouselItem">
            <img src={Shopping} alt="" className="activityCarouselImg"/>
            <div className="carouselTitle">Shopping</div>
            <div className="carouselBody">Daejeon Mall</div>
        </div>
        </>
    )
}

const LocationCarouselItems = () => {
    const content: JSX.Element[] = [];
    return (
        <div className="locationCarouselItem">
            <img src={Shopping} alt="" className="locationCarouselImg"/>
            <div className="carouselTitle">Shopping</div>
            <div className="carouselBody">in Daejeon Mall</div>
        </div>
    )
}

const HourCarouselItems = (props: Props) => {
    const {onClick, clicked = "0", date = new Date()} = props;
    const content: JSX.Element[] = [];
    const [clickedHour, setClickedHour] = useState<string>(clicked);
    const [dragging, setDragging] = useState<boolean>(false);
    const dateWeather = getDateWeather(date) as DateWeather;

    const CarouselWeatherIcon = (props: {weather: string}) => {
        switch(props.weather) {
            case "Clear": return <Clear className="carouselWeatherIcon"/>
            case "Clouds": return <Clouds className="carouselWeatherIcon"/>
            case "Snow": return <Snow className="carouselWeatherIcon"/>
            case "Rain": return <Rain className="carouselWeatherIcon"/>
            default: return <></>
        }
    }

    for (let i = 0; i<24; i++) {
        content.push(
            <div key={`hour${i}`} 
                className={"hourCarouselItem"+ (i===parseInt(clickedHour)?" hourCarouselItemClicked":"")}
                onMouseDown={()=>setDragging(false)}
                onMouseMove={()=>setDragging(true)}
                onMouseUp={() => {
                    if (!dragging) {
                        setClickedHour(String(i));
                        onClick(String(i));
                    }
                }}>
                <CarouselWeatherIcon weather={dateWeather.hourly[i]}/>
                <div style={{height: "0.2vh"}}/>
                <div style={{pointerEvents: "none"}}>{i}</div>
            </div>)
    }
    return content;
}

const MinuteCarouselItems = (props: Props) => {
    const {onClick, clicked = "0"} = props;
    const content: JSX.Element[] = [];
    const [clickedMinute, setClickedMinute] = useState<string>(clicked);
    const [dragging, setDragging] = useState<boolean>(false);
    for (let i:number = 0; i<60; i+=5) {
        content.push(
        <div key={`minute${i}`} 
             className={"minuteCarouselItem"+ (i===parseInt(clickedMinute)?" minuteCarouselItemClicked":"")}
             onMouseDown={()=>setDragging(false)}
             onMouseMove={()=>setDragging(true)}
             onMouseUp={() => {
                if (!dragging) {
                    setClickedMinute(String(i));
                    onClick(String(i));
                }
             }}>
            <div style={{pointerEvents: "none"}}>{String(i).padStart(2, "0")}</div>
        </div>)
    }
    return content;
}

const Carousel = (props: Props) => {
    const {mode, margin = 0, clicked,} = props;
    const vh = (px: number) => px/window.innerHeight*100;
    const [dragging, setDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(margin);
    const [currentX, setCurrentX] = useState<number>(0);
    const viewerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const getHeight = () => {
        if (mode === "ACTIVITY") return "14.6vh";
        else if (mode === "HOUR") return "5vh";
        else if (mode === "MINUTE") return "3vh";
    }
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setDragging(true);
        setStartX(vh(e.pageX) - currentX);
    };
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!dragging) return;
        const x = vh(e.pageX) - startX;

        if (viewerRef.current && sliderRef.current) {
            const widthDiff = vh(viewerRef.current.getBoundingClientRect().width - sliderRef.current.getBoundingClientRect().width);
            if (x >= margin) setCurrentX(margin);
            else if (widthDiff - margin >= x) setCurrentX(widthDiff - margin);
            else setCurrentX(x);
        }
    };
    const handleMouseUpLeave = () => setDragging(false);

    useLayoutEffect(() => {
        if (mode === "HOUR" && clicked) {
            const hour = parseInt(clicked);
            if (hour < 4) setCurrentX(margin);
            else if (19 < hour) setCurrentX(-74.7)
            else setCurrentX(-4.5*hour+15.5);
        }
        else if (mode === "MINUTE" && clicked) {
            const minute = Math.floor(parseInt(clicked)/5);
            if (minute < 4) setCurrentX(margin);
            else if (7 < minute) setCurrentX(-20.7)
            else setCurrentX(-4.5*minute+15.5);
        }
    }, []);

    return (
        <div id="viewer" ref={viewerRef} style={{height: getHeight()}}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpLeave} onMouseLeave={handleMouseUpLeave}>
            <div id="slider" ref={sliderRef} style={{transform: `translateX(${currentX}vh)`}}>
                {mode === "ACTIVITY" && ActivityCarouselItems(props)}
                {mode === "LOCATION" && LocationCarouselItems()}
                {mode === "HOUR" && HourCarouselItems(props)}
                {mode === "MINUTE" && MinuteCarouselItems(props)}
            </div>
        </div>
    );
}

export default Carousel;