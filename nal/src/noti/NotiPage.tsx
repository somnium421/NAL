import { useRecoilState } from 'recoil';
import './NotiPage.css'
import PageTitle from '../components/PageTitle';
import NotiComp from '../components/NotiComp';
import { notiModeState } from '../utils/atom';

const NotiPage = () => {
    const [notiMode, setNotiMode] = useRecoilState(notiModeState);
    return (
        (<div id="notiPage">
            <PageTitle pageTitleMode="NOTI"/>
            <div id="notiCompLists">
                <div className="notiCompListTitle">Today</div>
                <NotiComp/>
                <NotiComp/>
                <div className="notiCompListTitle">Yesterday</div>
                <NotiComp/>
                <NotiComp/>
                <NotiComp/>
                <NotiComp/>
                <NotiComp/>
                <NotiComp/>
                <NotiComp/>
                <NotiComp/>
                <NotiComp/>
            </div>
        </div>)
    )
}

export default NotiPage;