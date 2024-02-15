import { useState } from 'react';
import './NavBar.css'
import { ReactComponent as Home } from "./svg/Home.svg";
import { ReactComponent as Schedule } from "./svg/Schedule.svg";
import { ReactComponent as More } from "./svg/More.svg";

const NavBar = ()=> {
    return (
        <div id="navBar">
            <div id="navBarIcons">
                <span><Home/></span>
                <span><Schedule/></span>
                <span><More/></span>
            </div>
            <div id="homeIndicator"></div>
        </div>
    );
}
  
export default NavBar;
