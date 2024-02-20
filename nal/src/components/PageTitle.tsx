import './PageTitle.css';
import { ReactComponent as Backward } from "../svg/Backward.svg";

interface Props {
    notiMode: boolean;
    pageTitleMode: string; // NOTI or MODI
    setNotiMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageTitle = (props: Props) => {
    return (
        <div id="title">
            <div id="titleBox"></div>
            <div id="titleLeft">
                <Backward id="backward" width="2vh" height="3vh" onClick={() => {
                    props.setNotiMode((prevState) => !prevState);
                }}/>
                <div id="titleText">{ props.pageTitleMode === "NOTI" ? "Notification" : "Modify Event"}</div>
            </div>
            { props.pageTitleMode === "NOTI" && <div id="deleteAll">Delete all</div> }
        </div>
    )
}

export default PageTitle;