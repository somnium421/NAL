import { useRecoilValue, useSetRecoilState } from 'recoil';
import './HomePhoto.css'
import { showModalState, similarDateRecordState } from '../../utils/atom';
import { Weather, dateToYearMonthDateNumber, numberToMonthDateYear } from '../../utils/util';

export interface IRecord extends Weather {
    temperature: {
        current: number;
        feel: number;
        high: number;
        low: number;
    };
    wind: {
        direction: string;
        speed: number;
    };
    photos: {
        main: string;
        other: string[];
    }
    felt: string;
    date: Date;
}

const HomePhoto = () => {
    const setShowModal = useSetRecoilState(showModalState);
    const similarDateRecord = useRecoilValue(similarDateRecordState);

    return (
        <div id="homePhoto" onClick={()=>setShowModal(true)}>
            <img id="exampleImg" src={`img/${similarDateRecord.photos.main}`} alt=""/>
            <div id="homePhotoText">
                <div id="homePhotoTextTop">Today is similar to <span id="asdf" className="gradient">{numberToMonthDateYear(dateToYearMonthDateNumber(new Date(similarDateRecord.date)))}</span></div>
                <div id="homePhotoTextBottom"><span id="weatherFelt">Weather felt</span> {similarDateRecord.felt}</div>
            </div>
        </div>
    );
}

export default HomePhoto;