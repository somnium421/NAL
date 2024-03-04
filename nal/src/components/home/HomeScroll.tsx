import { useRecoilState } from 'recoil'
import { showFeelState } from '../../utils/atom'
import './HomeScroll.css'
import HomeWeather from './HomeWeather'
import Feel from './Feel'
import { CSSTransition } from 'react-transition-group'
import EventList from '../common/EventList'

const HomeScroll = () => {
    const [showFeel, setShowFeel] = useRecoilState(showFeelState);
    return (
        <div id="scroll">
            <div id="homeScroll">
                <HomeWeather weatherMode="HOME"/>
                <div style={{height: "1vh"}}></div>
                <CSSTransition in={showFeel} timeout={500} classNames="feel" unmountOnExit>
                    <Feel/>
                </CSSTransition>
                <div style={{height: "1vh"}}></div>
                <div id="upcomingEvents">
                    <div id="upcomingEventsTitle">Upcoming Events</div>
                    <EventList/>
                </div>
                <div style={{height: "5vh"}}></div>
            </div>
        </div>
    );
}

export default HomeScroll;