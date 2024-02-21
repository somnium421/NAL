import './NotiPage.css'
import PageTitle from '../components/common/PageTitle';
import NotiComp from '../components/noti/NotiComp';

const NotiPage = () => {
    return (
        <div id="notiPage" className="page">
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
        </div>
    );    
}

export default NotiPage;