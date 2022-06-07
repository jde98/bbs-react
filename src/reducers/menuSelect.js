export const MENU_SELECTED = "MENU/MENU_SELECTED";

const initialState = {
    menu: ['게시판', '공지사항']
};

export const menuSelected = (menu) => ({
    type: MENU_SELECTED,
    menu: menu,
});

export const menu = (state = initialState, action) => {
    switch (action.type) {
        case MENU_SELECTED:
            return {
                ...state
                , menu: action.menu
            };
        default:
            return state;
    }
}
