import './HomePhoto.css'
import './font.css'

const HomePhoto = () => {
    return (
        <div id="homePhoto">
            {/* <img id="exampleImg1" src="img/Home.jpg" alt="" /> */}
            <img id="exampleImg" src="img/DSCF9377.jpg" alt=""  onClick={() => {
                console.log("Image Clicked");
            }}/>
            <div id="homePhotoText">
                <div id="homePhotoTextTop">Today is similar to <span className="gradient">Nov 30, 2022</span></div>
                <div id="homePhotoTextBottom"><span id="weatherFelt">Weather felt</span> cold.</div>
            </div>
            <div id="homeTags">
                
            </div>
        </div>
    );
}

export default HomePhoto;