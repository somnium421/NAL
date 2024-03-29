import { useRecoilState, useSetRecoilState } from 'recoil';
import './PageTitle.css';
import { ReactComponent as Arrow } from "../../svg/Arrow.svg";
import { showNotiState, showEventState, notificationState } from '../../utils/atom';
import { useEffect, useState } from 'react';

interface Props {
    pageTitleMode: string; // NOTI or EVENT
    onClickRight?: ()=>void;
    rightClickAvailable: boolean;
}

const PageTitle = (props: Props) => {
    const {pageTitleMode, onClickRight, rightClickAvailable} = props;
    const setShowNoti = useSetRecoilState(showNotiState);
    const [showEvent, setShowEvent] = useRecoilState(showEventState);
    const [notification, setNotification] = useRecoilState(notificationState);
    const [backwardClicked, setBackwardClicked] = useState<boolean>(false);

    const TitleText = () => {
        switch(pageTitleMode){
            case "NOTI": return "Notification";
            case "EVENT": return `${showEvent==="new"?"New ":""}Event`;
        }
    }

    const backwardOnClick = () => {
        switch(pageTitleMode) {
            case "NOTI": {
                const tmpNotification = [...notification].map(item => ({...item, checked: true,}));
                setNotification(tmpNotification);
                setBackwardClicked(true);
                break;
            }
            case "EVENT": setShowEvent("false"); break;
        }
    }

    useEffect(() => {
        if (backwardClicked) {
            setShowNoti(false);
        }
    }, [notification]);

    return (
        <div id="title">
            <div id="titleLeft">
                <Arrow id="backward" onClick={backwardOnClick}/>
                <div id="titleText">{TitleText()}</div>
            </div>
            <div id="titleRight" onClick={rightClickAvailable?onClickRight:()=>{}} 
                 style={{color: rightClickAvailable?"var(--purple)":"gray"}}>
                {pageTitleMode === "NOTI" && <div id="deleteAll">Delete all</div>}
                {pageTitleMode === "EVENT" && <div id="done">Done</div> }
            </div>
        </div>
    )
}

export default PageTitle;