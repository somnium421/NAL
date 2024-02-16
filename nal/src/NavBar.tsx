import './NavBar.css'
import { ReactComponent as Home } from "./svg/Home.svg";
import { ReactComponent as Schedule } from "./svg/Schedule.svg";
import { ReactComponent as More } from "./svg/More.svg";

const NavBar = ()=> {
    return (
        <div id="navBar">
            <div id="navBarIcons">
                <Home width="3vh"/>
                <Schedule width="3vh"/>
                <More width="3vh"/>
            </div>
            <div id="homeIndicator"></div>
        </div>
    );
}
  
export default NavBar;
