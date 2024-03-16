import './NotiPage.css'
import PageTitle from '../components/common/PageTitle';
import NotiComp from '../components/noti/NotiComp';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { notificationState, recordState } from '../utils/atom';

const NotiPage = () => {
    const [notification, setNotification] = useRecoilState(notificationState);
    const resetNotification = useResetRecoilState(notificationState);
    const record = useRecoilValue(recordState);

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