import { useRecoilState } from 'recoil';
import './NavBar.css';
import { ReactComponent as Home } from "../svg/Home.svg";
import { ReactComponent as HomeClicked } from "../svg/HomeClicked.svg";
import { ReactComponent as Schedule } from "../svg/Schedule.svg";
import { ReactComponent as ScheduleClicked } from "../svg/ScheduleClicked.svg";
import { ReactComponent as More } from "../svg/More.svg";
import { ReactComponent as MoreClicked } from "../svg/MoreClicked.svg";
import { ReactComponent as Noti } from "../svg/Noti.svg";
import { ReactComponent as NotiDot } from "../svg/NotiDot.svg";
import { modeState, notiModeState } from '../utils/atom';

const NavBar = ()=> {
    const [mode, setMode] = useRecoilState(modeState);
    const [notiMode, setNotiMode] = useRecoilState(notiModeState);
    const changeNotiMode = () => {
        setNotiMode(!notiMode)
    }

    return (
        <div>
            {mode === "HOME" &&
            <><Noti id="noti" onClick={changeNotiMode} width="3vh" height="2.4vh"/>
            <NotiDot id="notiDot" onClick={changeNotiMode} width="0.6vh" height="0.6vh"/></>            
            }
            <div id="navBar">
                <div id="navBarIcons">
                    { mode === "HOME"
                    ?<HomeClicked className="navBarIcon"/>
                    :<Home className="navBarIcon" onClick={()=>setMode("HOME")}/>}
                    { mode === "SCHEDULE"
                    ?<ScheduleClicked className="navBarIcon"/>
                    :<Schedule className="navBarIcon" onClick={()=>setMode("SCHEDULE")}/>}
                    { mode === "MORE"
                    ?<div><MoreClicked className="navBarIcon"/></div>
                    :<div onClick={()=>setMode("MORE")}><More className="navBarIcon"/></div>}
                </div>
                <div id="homeIndicator"></div>
            </div>
        </div>
        
    );
}
  
export default NavBar;