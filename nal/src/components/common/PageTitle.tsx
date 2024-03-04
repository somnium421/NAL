import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import './PageTitle.css';
import { ReactComponent as Arrow } from "../../svg/Arrow.svg";
import { showNotiState, showEventState, currentEventState, notiCheckedState } from '../../utils/atom';

interface Props {
    pageTitleMode: string; // NOTI or MODI // EVENT
    modiMode?: string; // Activity or Time or Location
    onClickRight?: ()=>void;
}

const PageTitle = (props: Props) => {
    const currentEvent = useRecoilValue(currentEventState);
    const setShowNoti = useSetRecoilState(showNotiState);
    const [showEvent, setShowEvent] = useRecoilState(showEventState);
    const setNotiChecked = useSetRecoilState(notiCheckedState);

    const TitleText = () => {
        switch(props.pageTitleMode){
            case "NOTI": return "Notification";
            case "MODI": return `Modify ${props.modiMode}`;
            case "EVENT": return `${showEvent==="new"?"New ":""}Event`;
        }
    }

    return (
        <div id="title">
            <div id="titleBox" className={props.pageTitleMode==="NOTI"?"titleBoxShadow":""}></div>
            <div id="titleLeft">
                <Arrow id="backward" onClick={() => {
                    switch(props.pageTitleMode) {
                        case "NOTI": setShowNoti(false); setNotiChecked(true); break;
                        case "EVENT": setShowEvent("false"); break;
                    }
                }}/>
                <div id="titleText">{TitleText()}</div>
            </div>
            <div id="titleRight" onClick={props.onClickRight}>
                {/* {props.pageTitleMode === "NOTI" && <div id="deleteAll">Delete all</div>} */}
                {props.pageTitleMode === "EVENT" && <div id="done">Done</div> }
            </div>
        </div>
    )
}

export default PageTitle;