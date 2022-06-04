import {MENU_SELECTED} from './type';

export const menuSelcted = (menu) => {
    return {
        type: MENU_SELECTED,
        payload: {
            menu
        }
    };
};
