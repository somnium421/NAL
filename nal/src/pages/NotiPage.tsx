import './NotiPage.css'
import PageTitle from '../components/common/PageTitle';
import NotiComp from '../components/noti/NotiComp';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { notificationState, pageTitleRightClickAvailableState } from '../utils/atom';
import { useEffect } from 'react';

const NotiPage = () => {
    const notification = useRecoilValue(notificationState);
    const resetNotification = useResetRecoilState(notificationState);
    const setPageTitleRightClickAvailable = useSetRecoilState(pageTitleRightClickAvailableState);

    useEffect(() => {
        if (notification.length) setPageTitleRightClickAvailable(true);
        else setPageTitleRightClickAvailable(false);
    }, [notification]);

    return (
        <div id="notiPage" className="page">
            <PageTitle pageTitleMode="NOTI" onClickRight={resetNotification}/>
            <div id="notiCompLists">
                {notification?.map((item, idx) => <NotiComp key={idx} idx={idx}/>)}
            </div>
        </div>
    );    
}

export default NotiPage;