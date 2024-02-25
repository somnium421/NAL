import { CSSTransition } from 'react-transition-group';
import './HomePage.css';
import HomeModal from '../components/home/HomeModal';
import HomePhoto from '../components/home/HomePhoto';
import HomeScroll from '../components/home/HomeScroll';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { showModalState, showNotiState } from '../utils/atom';
import { ReactComponent as Noti } from "../svg/Noti.svg";
import { ReactComponent as NotiDot } from "../svg/NotiDot.svg";
import NotiPage from './NotiPage';

const NotiIcon = () => {
    const setShowNoti = useSetRecoilState(showNotiState);
    return (<>
        <Noti id="noti" onClick={()=>setShowNoti(true)} width="3vh" height="2.4vh"/>
        <NotiDot id="notiDot" onClick={()=>setShowNoti(true)} width="0.6vh" height="0.6vh"/>
    </>)
}

const HomePage = () => {
    const showModal = useRecoilValue(showModalState);
    const showNoti = useRecoilValue(showNotiState);
    
    return ( 
        <div id="homePage" className="page">
            <HomePhoto/>
            <NotiIcon />
            <HomeScroll/>
            <CSSTransition in={showNoti} timeout={500} classNames="sidePage" unmountOnExit>
                <NotiPage/>
            </CSSTransition>
            <CSSTransition in={showModal} timeout={500} classNames="modal" unmountOnExit>
              <HomeModal/>
            </CSSTransition>
        </div>
    )
}

export default HomePage;