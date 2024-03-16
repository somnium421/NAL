import { useRecoilState } from 'recoil';
import './NavBar.css';
import { ReactComponent as Home } from "../../svg/Home.svg";
import { ReactComponent as Schedule } from "../../svg/Schedule.svg";
import { ReactComponent as More } from "../../svg/More.svg";
import { modeState, showNotiState } from '../../utils/atom';

const NavBar = ()=> {
    const [mode, setMode] = useRecoilState(modeState);
    return (
        <div>
            <div id="navBar">
                <div id="navBarIcons">
                    { mode === "HOME"
                    ?<Home className="navBarIcon" style={{color: "var(--purple)"}}/>
                    :<Home className="navBarIcon" style={{color: "black"}} onClick={()=>setMode("HOME")}/>}
                    { mode === "SCHEDULE"
                    ?<Schedule className="navBarIcon" style={{color: "var(--purple)"}}/>
                    :<Schedule className="navBarIcon" style={{color: "black"}} onClick={()=>setMode("SCHEDULE")}/>}
                    { mode === "MORE"
                    ?<More className="navBarIcon" style={{color: "var(--purple)"}}/>
                    :<More className="navBarIcon" style={{color: "black"}}/>}
                </div>
            </div>
        </div>
        
    );
}
  
export default NavBar;