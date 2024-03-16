import './HomeModal.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { showModalState, similarDateRecordState } from '../../utils/atom';
import HomeWeather from '../../components/home/HomeWeather';

const HomeModal = () => {
    const setShowModal = useSetRecoilState(showModalState);
    const similarDateRecord = useRecoilValue(similarDateRecordState);

    return (
        <div id="homeModal" className="page" onClick={()=>setShowModal(false)}>
            <div id="modal">
                <HomeWeather weatherMode="MODAL"/>
                <div style={{height: "1.5vh"}}/>
                <div id="modalPhoto">
                    <div>Other photos</div>
                    <div style={{height: "0.5vh"}}/>
                    <div id="modalPhotoBoxes">
                        <div id="modalPhotoBox1" className="modalPhotoBox">
                            <img style={{width: "100%"}} src={`img/${similarDateRecord.photos.other[0]}`} alt=""/>
                        </div>
                        <div id="modalPhotoBox23">
                            <div id="modalPhotoBox2" className="modalPhotoBox">
                                <img style={{width: "100%"}} src={`img/${similarDateRecord.photos.other[1]}`} alt=""/>
                            </div>
                            <div id="modalPhotoBox3" className="modalPhotoBox">
                                <img style={{height: "100%"}} src={`img/${similarDateRecord.photos.other[2]}`} alt=""/>
                            </div>
                        </div>   
                    </div>            
                </div>
            </div>
        </div>
    )
}

export default HomeModal;