import './HomeScroll.css';
import Weather from './Weather'
import UpcomingEvents from './UpcomingEvents'

const HomeScroll = () => {
    return (
        <div id="homeScroll">
            <Weather/>
            <UpcomingEvents/>
        </div>
    );
}

export default HomeScroll;