import './HomeModal.css';
import { useRecoilState } from 'recoil';
import { showModalState } from '../../utils/atom';
import HomeWeather from '../../components/home/HomeWeather';

const HomeModal = () => {
    const [showModal, setShowModal] = useRecoilState(showModalState);
    return (
        <div id="homeModal" className="page" onClick={()=>setShowModal(false)}>
            <div id="modal">
                <HomeWeather weatherMode="MODAL"/>
                <div style={{height: "1.5vh"}}></div>
                <div id="modalPhotoBoxes">
                    <div id="modalPhotoBox1" className="modalPhotoBox">
                        <img style={{width: "100%", marginTop: "-1vh"}} src="img/DSC01673.jpg" alt=""/>
                    </div>
                    <div id="modalPhotoBox23">
                        <div id="modalPhotoBox2" className="modalPhotoBox">
                            <img style={{width: "100%", marginTop: "-7vh"}} src="img/DSC01686.jpg" alt=""/>
                        </div>
                        <div id="modalPhotoBox3" className="modalPhotoBox">
                            <img style={{width: "100%", marginTop: ""}} src="img/DSCF9438.jpg" alt=""/>
                        </div>
                    </div>                        
                </div>
            </div>
        </div>
    )
}

export default HomeModal;