import { useRecoilValue } from 'recoil'
import { eventsState, showFeelState } from '../../utils/atom'
import './HomeScroll.css'
import HomeWeather from './HomeWeather'
import Feel from './Feel'
import { CSSTransition } from 'react-transition-group'
import EventList from '../common/EventList'

const HomeScroll = () => {
    const showFeel = useRecoilValue(showFeelState);
    const events = useRecoilValue(eventsState);
    return (
        <div id="scroll">
            <div id="homeScroll">
                <HomeWeather weatherMode="HOME"/>
                <div style={{height: "1vh"}}></div>
                <CSSTransition in={showFeel} timeout={500} classNames="feel" unmountOnExit>
                    <Feel/>
                </CSSTransition>
                {events.length !== 0 && <>
                <div style={{height: "1vh"}}></div>
                <div id="upcomingEvents">
                    <div id="upcomingEventsTitle">Upcoming Events</div>
                    <EventList/>
                </div>
                </>}
                <div style={{height: "5vh"}}></div>
            </div>
        </div>
    );
}

export default HomeScroll;