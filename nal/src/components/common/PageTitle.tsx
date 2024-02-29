import { useRecoilState } from 'recoil';
import './PageTitle.css';
import { ReactComponent as Arrow } from "../../svg/Arrow.svg";
import { showNotiState, showEventState, currentEventState } from '../../utils/atom';

interface Props {
    pageTitleMode: string; // NOTI or MODI // EVENT
    modiMode?: string; // Activity or Time or Location
}

const PageTitle = (props: Props) => {
    const [showNoti, setShowNoti] = useRecoilState(showNotiState);
    const [showEvent, setShowEvent] = useRecoilState(showEventState);
    const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);

    const TitleText = () => {
        switch(props.pageTitleMode){
            case "NOTI": return "Notification";
            case "MODI": return `Modify ${props.modiMode}`;
            case "EVENT": return `${currentEvent.activity===""?"New ":""}Event`;
        }
    }

    return (
        <div id="title">
            <div id="titleBox" className={props.pageTitleMode==="NOTI"?"titleBoxShadow":""}></div>
            <div id="titleLeft">
                <Arrow id="backward" onClick={() => {
                    switch(props.pageTitleMode) {
                        case "NOTI": setShowNoti(false); break;
                        case "EVENT": setShowEvent(false); break;
                    }
                }}/>
                <div id="titleText">{TitleText()}</div>
            </div>
            <div id="titleRight">
                { props.pageTitleMode === "NOTI"
                 ?<div id="deleteAll">Delete all</div> 
                 :<div id="done" onClick={() => setShowEvent(false)}>Done</div> }
            </div>
        </div>
    )
}

export default PageTitle;