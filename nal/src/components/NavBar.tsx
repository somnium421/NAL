import './NavBar.css'
import { ReactComponent as Home } from "../svg/Home.svg";
import { ReactComponent as HomeClicked } from "../svg/HomeClicked.svg";
import { ReactComponent as Schedule } from "../svg/Schedule.svg";
import { ReactComponent as ScheduleClicked } from "../svg/ScheduleClicked.svg";
import { ReactComponent as More } from "../svg/More.svg";
import { ReactComponent as MoreClicked } from "../svg/MoreClicked.svg";
import { ReactComponent as Noti } from "../svg/Noti.svg";
import { ReactComponent as NotiDot } from "../svg/NotiDot.svg";

interface Props {
    mode: string;
    setMode: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar = (props: Props)=> {
    return (
        <div>
            {props.mode === "HOME" &&
            <><Noti id="noti" width="3vh" height="2.4vh"/>
            <NotiDot id="notiDot" width="0.6vh" height="0.6vh"/></>            
            }
            <div id="navBar">
                <div id="navBarIcons">
                    { props.mode === "HOME"
                    ?<HomeClicked className="navBarIcon"/>
                    :<Home className="navBarIcon" onClick={() => {
                        props.setMode("HOME");
                    }}/>}
                    { props.mode === "SCHEDULE"
                    ?<ScheduleClicked className="navBarIcon"/>
                    :<Schedule className="navBarIcon" onClick={() => {
                        props.setMode("SCHEDULE");
                    }}/>}
                    { props.mode === "MORE"
                    ?<div><MoreClicked className="navBarIcon"/></div>
                    :<div onClick={() => {
                        props.setMode("MORE");
                    }}><More className="navBarIcon"/></div>}
                </div>
                <div id="homeIndicator"></div>
            </div>
        </div>
        
    );
}
  
export default NavBar;