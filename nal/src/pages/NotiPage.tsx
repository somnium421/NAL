import './NotiPage.css'
import PageTitle from '../components/common/PageTitle';
import NotiComp from '../components/noti/NotiComp';
import { useRecoilValue } from 'recoil';
import { notificationState } from '../utils/atom';

const NotiPage = () => {
    const notification = useRecoilValue(notificationState);

    return (
        <div id="notiPage" className="page">
            <PageTitle pageTitleMode="NOTI"/>
            <div id="notiCompLists">
                {notification?.map((item, idx) => <NotiComp key={idx} idx={idx}/>)}
            </div>
        </div>
    );    
}

export default NotiPage;