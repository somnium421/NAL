import { CSSTransition } from 'react-transition-group';
import './HomePage.css';
import HomeModal from '../components/home/HomeModal';
import HomePhoto from '../components/home/HomePhoto';
import HomeScroll from '../components/home/HomeScroll';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { notiCheckedState, showModalState, showNotiState } from '../utils/atom';
import { ReactComponent as Noti } from "../svg/Noti.svg";

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