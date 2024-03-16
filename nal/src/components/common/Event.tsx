import './Event.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentEventState, eventsState, showEventState } from '../../utils/atom';
import { dateToHourMinute, dateToYearMonthDate } from '../../utils/util';

export interface IEvent  {
    idx?: number;
    activity?: string;
    time: [Date, Date];
    location?: string;
    note?: string;
    timeMode?: string; // NO or START or END or ALL
    modify?: string;
}

interface Props {
    idx: number;
    timeMode?: string;
}

const Event = (props: Props) => {
    const {idx, timeMode} = props;
    const events = useRecoilValue(eventsState);
    const setShowEvent = useSetRecoilState(showEventState);
    const setCurrentEvent = useSetRecoilState(currentEventState);

    const startTime = () => {
        if (timeMode !== undefined) {
            if (timeMode === "NO" || timeMode === "START") return dateToHourMinute(events[idx].time[0]);
            else if (timeMode === "ALL") return "All Day";
            else return "~";
        }
        else return `${dateToYearMonthDate(events[idx].time[0])} ${dateToHourMinute(events[idx].time[0])}`;
    }

    const endTime = () => {
        if (timeMode !== undefined) {
            if (timeMode === "NO" || timeMode === "END") return dateToHourMinute(events[idx].time[1]);
            else if (timeMode === "START") return "~";
            else return <>&nbsp;</>
        }
        else return `${dateToYearMonthDate(events[idx].time[1])} ${dateToHourMinute(events[idx].time[1])}`;
    }

    return (
        <li className={`event ${events[idx].modify!=="No"?"needModify":""}`} onClick={() => {
            setCurrentEvent({...events[idx], idx: idx});
            setShowEvent("true");
        }}>
            <div>
                <div className="eventActivity">{events[idx].activity}</div>
                <div className="eventLocation">{events[idx].location}</div>
            </div>
            <div>
                <div className="eventTime">{events[idx] && startTime()}</div>
                <div className="eventTime">{events[idx] && endTime()}</div>
            </div>
        </li>
    )
}

export default Event;