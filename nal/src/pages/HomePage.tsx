import './HomePage.css'
import HomePhoto from '../components/HomePhoto';
import HomeScroll from '../components/HomeScroll';

const HomePage = () => {
    return (
        <div id="homePage">
            <HomePhoto/>
            <HomeScroll/>
        </div>
    )
}

export default HomePage;