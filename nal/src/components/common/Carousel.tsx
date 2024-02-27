import { useEffect, useRef } from 'react';
import './Carousel.css';
import Clear from '../../img/Clear.png';
import Shopping from '../../img/Shopping.jpg';

interface Props {
    mode: string; // ACTIVITY or LOCATION or HOUR or MINUTE
    margin: number;
    start?: number
}

const ActivityCarouselItems = () => {
    const content: JSX.Element[] = [];
    return (
        <div className="activityCarouselItem">
            <img src={Shopping} alt="" className="activityCarouselImg"/>
            <div className="carouselTitle">Shopping</div>
            <div className="carouselBody">in Daejeon Mall</div>
        </div>
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

const HourCarouselItems = () => {
    const content: JSX.Element[] = [];
    for (let i:number = 0; i<24; i++) {
        content.push(<div key={`hour${i}`} className="hourCarouselItem">
            <img src={Clear} alt="" className="carouselWeatherIcon"/>
            <div>{i}</div>
        </div>)
    }
    return content;
}

const MinuteCarouselItems = () => {
    const content: JSX.Element[] = [];
    for (let i: number = 0; i<12; i++) {
        content.push(<div key={`minute${i*5}`} className="minuteCarouselItem">{i*5}</div>)
    }
    return content
}

const Carousel = ({mode, margin = 0, start}: Props) => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const getHeight = () => {
        if (mode === "ACTIVITY") return "14.6vh";
        else if (mode === "HOUR") return "5vh";
        else if (mode === "MINUTE") return "3vh";
    }

    const vh = (px: number) => px/window.innerHeight*100;

    useEffect(() => {
        if (viewerRef.current !== null && sliderRef.current !== null) {
            const viewerCurrent = viewerRef.current;
            const sliderCurrent = sliderRef.current;
            let pressed = false;
            let startX: number;
            sliderCurrent.style.left = `${margin}vh`;

            const mouseDown = (e: MouseEvent) => {
                pressed = true;
                startX = e.offsetX - sliderCurrent.offsetLeft;
            }

            const mouseUpLeave = () => {
                pressed = false;
            }

            const mouseMove = (e: MouseEvent) => {
                if (!pressed) return ;
                e.preventDefault();

                const left = (e.offsetX-startX); // px
                const sliderRect = sliderCurrent.getBoundingClientRect();
                const viewerRect = viewerCurrent.getBoundingClientRect();
                if (vh(left) > margin) sliderCurrent.style.left = `${margin}vh`;
                else if (vh(sliderRect.width + left) + margin < vh(viewerRect.width)) {
                    sliderCurrent.style.left = `-${vh(sliderRect.width - viewerRect.width) + margin}vh`;
                }
                else sliderCurrent.style.left = `${vh(left)}vh`;
            }
            
            viewerCurrent.addEventListener("mousedown", mouseDown)
            viewerCurrent.addEventListener("mouseup", mouseUpLeave);
            viewerCurrent.addEventListener("mousemove", mouseMove);
            viewerCurrent.addEventListener("mouseleave", mouseUpLeave);

            return () => {
                viewerCurrent.removeEventListener("mousedown", mouseDown);
                viewerCurrent.removeEventListener("mouseup", mouseUpLeave);
                viewerCurrent.removeEventListener("mousemove", mouseMove);
                viewerCurrent.removeEventListener("mouseleave", mouseUpLeave);
            }
        }
    }, []);

    return (
        <div id="viewer" ref={viewerRef} style={{height: getHeight()}}>
            <div id="slider" ref={sliderRef}>
                {mode === "ACTIVITY" && ActivityCarouselItems()}
                {mode === "LOCATION" && LocationCarouselItems()}
                {mode === "HOUR" && HourCarouselItems()}
                {mode === "MINUTE" && MinuteCarouselItems()}
            </div>
        </div>
    )
}

export default Carousel;