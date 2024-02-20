import { atom } from 'recoil';

export const modeState = atom({
    key: "mode",
    default: "HOME",
});

export const notiModeState = atom({
    key: "notiMode",
    default: false,
});

export const modiModeState = atom({
    key: "modiMode",
    default: false,
});

export const statusBarColorState = atom({
    key: "statusBarColor",
    default: "white",
});