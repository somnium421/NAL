import { atom } from 'recoil';
import { IEvent } from '../components/common/Event';

export interface IEventsByDate {
    [key: number]: [number, string][];
}

export const modeState = atom({
    key: "mode",
    default: "HOME",
});
export const showNotiState = atom({
    key: "showNoti",
    default: false,
});
export const showEventState = atom({
    key: "showEvent",
    default: false,
});
export const showFeelState = atom({
    key: "showFeel",
    default: true,
});
export const showModalState = atom({
    key: "showModal",
    default: false,
})
export const statusBarColorState = atom({
    key: "statusBarColor",
    default: "white",
});
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
    key: "currentEvent",
    default: {
        time: resetCurrentEvent(),
    },
})