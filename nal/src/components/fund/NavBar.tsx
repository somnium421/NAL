import { useRecoilState } from 'recoil';
import './NavBar.css';
import { ReactComponent as Home } from "../../svg/Home.svg";
import { ReactComponent as HomeClicked } from "../../svg/HomeClicked.svg";
import { ReactComponent as Schedule } from "../../svg/Schedule.svg";
import { ReactComponent as ScheduleClicked } from "../../svg/ScheduleClicked.svg";
import { ReactComponent as More } from "../../svg/More.svg";
import { ReactComponent as MoreClicked } from "../../svg/MoreClicked.svg";
import { modeState, showNotiState } from '../../utils/atom';

const NavBar = ()=> {
    const [mode, setMode] = useRecoilState(modeState);
    return (
        <div>
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
            </div>
        </div>
        
    );
}
  
export default NavBar;