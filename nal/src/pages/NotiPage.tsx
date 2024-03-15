import './NotiPage.css'
import PageTitle from '../components/common/PageTitle';
import NotiComp from '../components/noti/NotiComp';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { notificationState } from '../utils/atom';
import { useEffect, useState } from 'react';

const NotiPage = () => {
    const notification = useRecoilValue(notificationState);
    const resetNotification = useResetRecoilState(notificationState);
    const [pageTitleRightClickAvailable, setPageTitleRightClickAvailable] = useState<boolean>(true);

    useEffect(() => {
        if (notification.length) setPageTitleRightClickAvailable(true);
        else setPageTitleRightClickAvailable(false);
    }, [notification]);

    return (
        <div id="notiPage" className="page">
            <PageTitle pageTitleMode="NOTI" onClickRight={resetNotification} rightClickAvailable={pageTitleRightClickAvailable}/>
            <div id="notiCompLists">
                {notification?.map((item, idx) => <NotiComp key={idx} idx={idx}/>)}
            </div>
        </div>
    );    
}

export default NotiPage;