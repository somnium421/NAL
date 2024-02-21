import { atom } from 'recoil';
import { IEvent } from '../components/common/Event';

export const modeState = atom({
    key: "mode",
    default: "HOME",
});
export const showNotiState = atom({
    key: "showNoti",
    default: false,
});
export const showModiState = atom({
    key: "showModi",
    default: false,
});
export const showEventState = atom({
    key: "showEvent",
    default: false,
});
export const showFeelState = atom({
    key: "showFeel",
    default: true,
})
export const statusBarColorState = atom({
    key: "statusBarColor",
    default: "white",
});
export const currentEventState = atom<IEvent>({
    key: "currentEvent",
    default: {
        activity: "",
        time: ["", ""],
        location: "",
        climate: "",
    },
})