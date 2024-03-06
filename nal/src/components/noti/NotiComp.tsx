import { useRecoilState, useRecoilValue } from 'recoil';
import './NotiComp.css';
import { ReactComponent as NotiWarning } from "../../svg/NotiWarning.svg";
import { ReactComponent as NotiFeel } from "../../svg/NotiFeel.svg";
import { notificationState } from '../../utils/atom';
import { useEffect } from 'react';

// const exampleProps: Props = {
//     notiType: "feel",
//     notiChecked: false,
//     text: ["How do you feel today?", "Help us to improve your experience"],
// }

interface Props {
    idx: number;
}

const NotiComp = (props: Props) => {
    const {idx} = props;
    const notification = useRecoilValue(notificationState);

    const NotiIcon = () => {
        switch (notification[idx].type) {
            case "feel": return <NotiFeel width="5vh" height="5vh"/>;
        }
    }

    useEffect(() => {console.log(notification)})

    return (
        <div className="notiComp">
            <div className="notiCompDotAndIcon">
                <div className="notiCompDot" style={{backgroundColor: notification[idx].checked?"transparent":"var(--purple"}}/>
                {NotiIcon()}
            </div>
            <div className="notiCompText">hi<br/>hello</div>
        </div>
    )
}

export default NotiComp;