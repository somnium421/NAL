import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import './NotiComp.css';
import { INotification, currentEventState, eventsState, notificationState, showEventState } from '../../utils/atom';
import Event, { IEvent } from '../common/Event';

interface Props {
    item: INotification;
}

const NotiComp = (props: Props) => {
    const {item} = props;
    const events = useRecoilValue(eventsState);
    const notification = useRecoilValue(notificationState);
    const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);
    const setShowEvent = useSetRecoilState(showEventState);
    let event: IEvent;
    if (item.eventIdx !== undefined) event = events[item.eventIdx!];

    const NotiContent = () => {
        switch (item.type) {
            case "MODIFY": return <><div className="modifyTitle">Rain is expected during the event</div>
            <Event idx={item.eventIdx!}/></>
        }
    }

    const onClick = () => {
        switch (item.type) {
            case "MODIFY": {
                setCurrentEvent({...event, idx: item.eventIdx});
                setShowEvent("true");
                break;
            }
        }
    }

    return (
        <div className="notiComp" onClick={onClick}>
            <div className="notiCompDot" style={{backgroundColor: item.checked?"transparent":"var(--purple"}}/>
            <div className="notiCompContent">{NotiContent()}</div>
        </div>
    )
}

export default NotiComp;