import { useRecoilState } from 'recoil';
import './PageTitle.css';
import { ReactComponent as Backward } from "../../svg/Backward.svg";
import { showNotiState, showModiState, showEventState, currentEventState } from '../../utils/atom';

interface Props {
    pageTitleMode: string; // NOTI or MODI // EVENT
    modiMode?: string; // Activity or Time or Location
}

const PageTitle = (props: Props) => {
    const [showNoti, setShowNoti] = useRecoilState(showNotiState);
    const [showModi, setShowModi] = useRecoilState(showModiState);
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
                <Backward id="backward" width="2vh" height="3vh" onClick={() => {
                    switch(props.pageTitleMode) {
                        case "NOTI": setShowNoti(false); break;
                        case "MODI": setShowModi(false); break;
                        case "EVENT": setShowEvent(false); break;
                    }
                }}/>
                <div id="titleText">{TitleText()}</div>
            </div>
            <div className="titleRight">
                { props.pageTitleMode === "NOTI"
                 ?<div id="deleteAll">Delete all</div> 
                 :<div id="done" onClick={() => setShowEvent(false)}>Done</div> }
            </div>
        </div>
    )
}

export default PageTitle;