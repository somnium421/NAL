import { useRecoilState } from 'recoil';
import './HomePhoto.css'
import { showModalState } from '../../utils/atom';

interface Props {
    top: string;
    left: string;
}

const HomePhoto = () => {
    const [showModal, setShowModal] = useRecoilState(showModalState);

    return (
        <div id="homePhoto">
            <img id="exampleImg" src="img/DSCF9377.jpg" alt=""  onClick={()=>setShowModal(true)}/>
            <div id="homePhotoText">
                <div id="homePhotoTextTop">Today is similar to <span id="asdf" className="gradient">Nov 30, 2022</span></div>
                <div id="homePhotoTextBottom"><span id="weatherFelt">Weather felt</span> cold</div>
            </div>
        </div>
    );
}

export default HomePhoto;