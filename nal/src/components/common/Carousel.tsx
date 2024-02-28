import { useEffect, useRef, useState } from 'react';
import './Carousel.css';
import Clear from '../../img/Clear.png';
import Shopping from '../../img/Shopping.jpg';

interface Props {
    mode: string; // ACTIVITY or LOCATION or HOUR or MINUTE
    margin: number;
    onClick: React.Dispatch<React.SetStateAction<any>>;
    start?: number;
    clicked?: string;
}

const ActivityCarouselItems = () => {
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
    const {onClick, clicked = "0"} = props;
    const content: JSX.Element[] = [];
    const [clickedHour, setClickedHour] = useState<string>(clicked);
    for (let i:number = 0; i<24; i++) {
        content.push(
        <div key={`hour${i}`} 
             className={"hourCarouselItem"+ (i===parseInt(clickedHour)?" hourCarouselItemClicked":"")}
             onClick={() => {
                setClickedHour(String(i));
                onClick(String(i));
            }}>
            <img src={Clear} alt="" className="carouselWeatherIcon"/>
            <div style={{pointerEvents: "none"}}>{i}</div>
        </div>)
    }
    return content;
}

const MinuteCarouselItems = (props: Props) => {
    const {onClick, clicked = "0"} = props;
    const content: JSX.Element[] = [];
    const [clickedMinute, setClickedMinute] = useState<string>(clicked);
    for (let i:number = 0; i<60; i+=5) {
        content.push(
        <div key={`minute${i}`} 
             className={"minuteCarouselItem"+ (i===parseInt(clickedMinute)?" minuteCarouselItemClicked":"")}
             onClick={() => {
                setClickedMinute(String(i));
                onClick(String(i));
            }}>
            <div style={{pointerEvents: "none"}}>{String(i).padStart(2, "0")}</div>
        </div>)
    }
    return content;
}

const Carousel = (props: Props) => {
    const {mode, margin = 0, start,} = props;
    const vh = (px: number) => px/window.innerHeight*100;
    const px = (vh: number) => vh*window.innerHeight/100;
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(margin);
    const [currentX, setCurrentX] = useState(margin);
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

    return (
        <div id="viewer" ref={viewerRef} style={{height: getHeight()}}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpLeave} onMouseLeave={handleMouseUpLeave}>
            <div id="slider" ref={sliderRef} style={{transform: `translateX(${currentX}vh)`}}>
                {mode === "ACTIVITY" && ActivityCarouselItems()}
                {mode === "LOCATION" && LocationCarouselItems()}
                {mode === "HOUR" && HourCarouselItems(props)}
                {mode === "MINUTE" && MinuteCarouselItems(props)}
            </div>
        </div>
    );
}

export default Carousel;