import HomePhoto from '../components/home/HomePhoto';
import HomeScroll from '../components/home/HomeScroll';

const HomePage = () => {
    return (
        <div id="homePage" className="page">
            <HomePhoto/>
            <HomeScroll/>
        </div>
    )
}

export default HomePage;