import './HomePhoto.css'
import '../font/font.css'

interface Props {
    top: string;
    left: string;
}

const homeTag = (props: Props) => {
    return (
        <div id="homeTag" style={{top: props.top, left:props.left}}>
            <div id="homeTagTri"></div>
            <div id="homeTagBox">Myeondong, Seoul</div>
        </div>
    )
}

const HomePhoto = () => {
    return (
        <div id="homePhoto">
            {/* <img id="exampleImg1" src="img/HOME_WITH_TAGS.jpg" alt="" /> */}
            <img id="exampleImg" src="img/DSCF9377.jpg" alt=""  onClick={() => {
                console.log("Image Clicked");
            }}/>
            <div id="homePhotoText">
                <div id="homePhotoTextTop">Today is similar to <span id="asdf" className="gradient">Nov 30, 2022</span></div>
                <div id="homePhotoTextBottom"><span id="weatherFelt">Weather felt</span> cold.</div>
            </div>
            <div id="homeTags">
                {homeTag({top: '4.2vh', left: '18.5vh'})}                
            </div>
        </div>
    );
}

export default HomePhoto;