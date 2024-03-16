import './NotiPage.css'
import PageTitle from '../components/fund/PageTitle';
import NotiComp from '../components/noti/NotiComp';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { notificationState } from '../utils/atom';

const NotiPage = () => {
    const notification = useRecoilValue(notificationState);
    const resetNotification = useResetRecoilState(notificationState);

    return (
        <div id="notiPage" className="page">
            <PageTitle pageTitleMode="NOTI" onClickRight={resetNotification} rightClickAvailable={notification.length!==0}/>
            <div id="notiCompLists">
                {notification.map((item, idx) => <NotiComp key={idx} item={item}/>)}
            </div>
        </div>
    );    
}

export default NotiPage;