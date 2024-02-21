import { useRecoilState } from 'recoil'
import { showFeelState } from '../../utils/atom'
import './HomeScroll.css'
import HomeWeather from './HomeWeather'
import UpcomingEvents from './UpcomingEvents'
import Feel from './Feel'

const HomeScroll = () => {
    const [showFeel, setShowFeel] = useRecoilState(showFeelState);
    return (
        <div id="scroll">
            <div id="homeScroll">
                <HomeWeather/>
                <div style={{height: "1vh"}}></div>
                {showFeel && <Feel/>}
                <UpcomingEvents/>
                <div style={{height: "30vh"}}></div>
            </div>
        </div>
    );
}

export default HomeScroll;