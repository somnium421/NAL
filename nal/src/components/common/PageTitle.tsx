import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import './PageTitle.css';
import { ReactComponent as Arrow } from "../../svg/Arrow.svg";
import { showNotiState, showEventState, notiCheckedState, notificationState, pageTitleRightClickAvailableState } from '../../utils/atom';
import { useEffect, useState } from 'react';

interface Props {
    pageTitleMode: string; // NOTI or MODI // EVENT
    modiMode?: string; // Activity or Time or Location
    onClickRight?: ()=>void;
}

const PageTitle = (props: Props) => {
    const {pageTitleMode, modiMode, onClickRight} = props;
    const setShowNoti = useSetRecoilState(showNotiState);
    const [showEvent, setShowEvent] = useRecoilState(showEventState);
    const setNotiChecked = useSetRecoilState(notiCheckedState);
    const [notification, setNotification] = useRecoilState(notificationState);
    const [backwardClicked, setBackwardClicked] = useState<boolean>(false);
    const pageTitleRightClickAvailable = useRecoilValue(pageTitleRightClickAvailableState);

    const TitleText = () => {
        switch(pageTitleMode){
            case "NOTI": return "Notification";
            case "MODI": return `Modify ${modiMode}`;
            case "EVENT": return `${showEvent==="new"?"New ":""}Event`;
        }
    }

    const backwardOnClick = () => {
        switch(pageTitleMode) {
            case "NOTI": {
                const tmpNotification = [...notification].map(item => ({
                    type: item.type,
                    date: item.date,
                    checked: true,
                }));
                setNotification(tmpNotification);
                setBackwardClicked(true);
                break;
            }
            case "EVENT": setShowEvent("false"); break;
        }
    }

    useEffect(() => {
        if (backwardClicked) {
            setNotiChecked(true);
            setShowNoti(false);
        }
    }, [notification])

    return (
        <div id="title">
            <div id="titleLeft">
                <Arrow id="backward" onClick={backwardOnClick}/>
                <div id="titleText">{TitleText()}</div>
            </div>
            <div id="titleRight" onClick={pageTitleRightClickAvailable?onClickRight:()=>{}}>
                {pageTitleMode === "NOTI" && 
                <div id="deleteAll" style={{color: pageTitleRightClickAvailable?"var(--purple)":"gray"}}>Delete all</div>}
                {pageTitleMode === "EVENT" && 
                <div id="done" style={{color: pageTitleRightClickAvailable?"var(--purple)":"gray"}}>Done</div> }
            </div>
        </div>
    )
}

export default PageTitle;