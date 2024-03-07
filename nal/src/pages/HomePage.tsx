import { CSSTransition } from 'react-transition-group';
import './HomePage.css';
import HomeModal from '../components/home/HomeModal';
import HomePhoto from '../components/home/HomePhoto';
import HomeScroll from '../components/home/HomeScroll';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { notiCheckedState, recordState, showModalState, showNotiState, similarDateRecordState, todayWeatherState } from '../utils/atom';
import { ReactComponent as Noti } from "../svg/Noti.svg";
import { useEffect } from 'react';

const NotiIcon = () => {
    const notiChecked = useRecoilValue(notiCheckedState);
    const setShowNoti = useSetRecoilState(showNotiState);
    return (<div id="notiIcon">
        <Noti id="noti" onClick={()=>setShowNoti(true)}/>
        {!notiChecked && <div id="notiDot"/>}
    </div>)
}

const HomePage = () => {
    const showModal = useRecoilValue(showModalState);
    const record = useRecoilValue(recordState);
    const todayWeather = useRecoilValue(todayWeatherState);
    const setSimilarDateRecord = useSetRecoilState(similarDateRecordState);

    useEffect(() => {
        let feelsLikeMaxDiff = 100;
        if (record.length && todayWeather.main !== "") {
            record.forEach(item => {
                if (todayWeather.temperature.feel && Math.abs(item.temperature.feel - todayWeather.temperature.feel) < feelsLikeMaxDiff) {
                    feelsLikeMaxDiff = Math.abs(item.temperature.feel - todayWeather.temperature.feel);
                    setSimilarDateRecord({
                        temperature: item.temperature,
                        humidity: item.humidity,
                        pressure: item.pressure,
                        main: item.main,
                        wind: item.wind,
                        photos: item.photos,
                        felt: item.felt,
                        date: item.date,
                    })
                }
            })
        }
    }, [record, todayWeather])
    
    return ( 
        <div id="homePage" className="page">
            <HomePhoto/>
            <NotiIcon />
            <HomeScroll/>
            <CSSTransition in={showModal} timeout={500} classNames="modal" unmountOnExit>
              <HomeModal/>
            </CSSTransition>
        </div>
    )
}

export default HomePage;