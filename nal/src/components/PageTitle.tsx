import { useRecoilState } from 'recoil';
import './PageTitle.css';
import { ReactComponent as Backward } from "../svg/Backward.svg";
import { notiModeState, modiModeState } from '../utils/atom';

interface Props {
    pageTitleMode: string; // NOTI or MODI
}

const PageTitle = (props: Props) => {
    const [notiMode, setNotiMode] = useRecoilState(notiModeState);
    const [modiMode, setModiMode] = useRecoilState(modiModeState);
    return (
        <div id="title">
            <div id="titleBox"></div>
            <div id="titleLeft">
                <Backward id="backward" width="2vh" height="3vh" onClick={() => {
                    setNotiMode(false);
                    setModiMode(false);
                }}/>
                <div id="titleText">{ props.pageTitleMode === "NOTI" ? "Notification" : "Modify Event"}</div>
            </div>
            { props.pageTitleMode === "NOTI" && <div id="deleteAll">Delete all</div> }
        </div>
    )
}

export default PageTitle;