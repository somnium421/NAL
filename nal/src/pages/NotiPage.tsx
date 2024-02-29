import './NotiPage.css'
import PageTitle from '../components/common/PageTitle';
import NotiComp from '../components/noti/NotiComp';
import { useSetRecoilState } from 'recoil';
import { statusBarColorState } from '../utils/atom';

const NotiPage = () => {
    return (
        <div id="notiPage" className="page">
            <PageTitle pageTitleMode="NOTI"/>
            <div id="notiCompLists">
                <div className="notiCompListTitle">Today</div>
                <NotiComp/>
            </div>
        </div>
    );    
}

export default NotiPage;