import { atom, RecoilEnv} from 'recoil';
import { IEvent } from '../components/common/Event';
import { IRecord } from '../components/home/HomePhoto';
import { WeatherSnapshot } from './util';
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export interface IEventsByDate {
    [key: number]: {
        idx: number;
        timeMode: string;
        }[];
}

export interface INotification {
    type: string;
    date: number;
    checked: boolean;
}

export const modeState = atom({
    key: "modeState",
    default: "LAUNCH",
});
export const showNotiState = atom({
    key: "showNotiState",
    default: false,
});
export const notiCheckedState = atom({
    key: "notiCheckedState",
    default: false,
})
export const showEventState = atom({
    key: "showEventState",
    default: "false",
});
export const showFeelState = atom({
    key: "showFeelState",
    default: true,
});
export const showModalState = atom({
    key: "showModalState",
    default: false,
})
export const eventsState = atom<IEvent[]>({
    key: "eventsState",
    default: [],
})
export const eventsByDateState = atom<IEventsByDate>({
    key: "eventsByDateState",
    default: {},
})

const resetCurrentEvent = (): [Date, Date] => {
    const date = new Date();
    return [new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()+1),
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()+2)];
}

export const currentEventState = atom<IEvent>({
    key: "currentEventState",
    default: {
        time: resetCurrentEvent(),
    },
})

export const notificationState = atom<INotification[]>({
    key: "notificationState",
    default: [],
})

export const recordState = atom<IRecord[]>({
    key: "recordState",
    default: [],
})

export const currentWeatherState = atom<WeatherSnapshot>({
    key: "currentWeatherState",
    default: {
        temperature: {
            current: 0,
            feel: 0,
            high: 0,
            low: 0,
        },
        humidity: 0,
        pressure: 0,
        main: "",
        wind: {
            direction: "",
            speed: 0,
        },
    },
})

export const similarDateRecordState = atom<IRecord>({
    key: "similarDateRecordState",
    default: {
        temperature: {
            current: 0,
            feel: 0,
            high: 0,
            low: 0,
        },
        humidity: 0,
        pressure: 0,
        main: "",
        wind: {
            direction: "",
            speed: 0,
        },
        photos: {
            main: "",
            other: [],
        },
        felt: "",
        date: new Date(),
    }
})