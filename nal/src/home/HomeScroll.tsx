import { useEffect, useRef } from 'react'
import './HomeScroll.css'
import Weather from './Weather'
import UpcomingEvents from './UpcomingEvents'

const HomeScroll = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollRefCurrent = scrollRef.current;
        const wheelHandler = (e: Event) => {
            e.preventDefault();
            if (scrollRefCurrent instanceof HTMLDivElement) {
                console.log(e);                
            }
        }
        if (scrollRefCurrent instanceof HTMLDivElement) {
            scrollRefCurrent.addEventListener("wheel", wheelHandler);
        }
        return () => {
            if (scrollRefCurrent instanceof HTMLDivElement) {
            scrollRefCurrent?.removeEventListener("wheel", wheelHandler);
            }
        }
    }, [])

    return (
        <div id="scroll">
            <div id="homeScroll">
                <Weather/>
                <UpcomingEvents/>
            </div>
        </div>
    );
}

export default HomeScroll;