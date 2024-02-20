import { useState, useEffect } from 'react';
import './NotiPage.css'
import PageTitle from '../components/PageTitle';
import NotiComp from '../components/NotiComp';

interface Props {
    notiMode: boolean;
    setNotiMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotiPage = (props: Props) => {
    return (
        (<div id="notiPage">
            <PageTitle notiMode={props.notiMode} pageTitleMode="NOTI" setNotiMode={props.setNotiMode}/>
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