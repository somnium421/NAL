import './HomePhoto.css'
import './font.css'
import { ReactComponent as Noti } from "./svg/Noti.svg";
import { ReactComponent as NotiDot } from "./svg/NotiDot.svg";


const HomePhoto = () => {
    return (
        <div id="homePhoto">
            {/* <img id="exampleImg1" src="img/Home.jpg" alt="" /> */}
            <img id="exampleImg" src="img/DSCF9377.jpg" alt="" />
            <div id="homePhotoTextNoti">
                <div id="homePhotoText">
                    <div id="homePhotoTextTop">Today is similar to <span className="gradient">Nov 30, 2022</span></div>
                    <div id="homePhotoTextBottom"><span>Weather felt</span> cold.</div>
                </div>
                {/* <div id="homePhotoText">Today is similar to <span className="gradient">Nov 30, 2022<span/>
                <br/>Weather felt cold.</div> */}
                <div id="homePhotoNoti">
                    <Noti id="noti"/>
                    <NotiDot id="notiDot"/>
                </div>
            </div>
        </div>
    );
}

export default HomePhoto;