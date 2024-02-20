import './HomeScroll.css'
import HomeWeather from './HomeWeather'
import UpcomingEvents from './UpcomingEvents'

const HomeScroll = () => {
    return (
        <div id="scroll">
            <div id="homeScroll">
                <HomeWeather/>
                <UpcomingEvents/>
            </div>
        </div>
    );
}

export default HomeScroll;