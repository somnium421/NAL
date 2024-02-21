import { useRecoilState } from 'recoil';
import './NotiComp.css';
import { ReactComponent as NotiWarning } from "../../svg/NotiWarning.svg";
import { ReactComponent as NotiFeel } from "../../svg/NotiFeel.svg";
import { showModiState } from '../../utils/atom';

interface Props {
    notiType: string;
    notiChecked: boolean;
    text: string[];
}

const exampleProps: Props = {
    notiType: "feel",
    notiChecked: false,
    text: ["How do you feel today?", "Help us to improve your experience"],
}


// const NotiComp = (props: Props) => {
const NotiComp = () => {
    const props: Props = exampleProps;
    const [showModi, setShowModi] = useRecoilState(showModiState);

    return (
        <div className="notiComp" onClick={() => setShowModi(!showModi)}>
            <div className="notiCompDotAndIcon">
                <div className="notiCompDot"></div>
                { props.notiType === "warning" && <NotiWarning width="5vh" height="5vh"/>}
                { props.notiType === "feel" && <NotiFeel width="5vh" height="5vh"/>}
            </div>
            <div className="notiCompText">{props.text[0]}<br/>{props.text[1]}</div>
        </div>
    );
}

export default NotiComp;