import { MENU_SELECTED } from '../action/type';

const menuSelect = (
  state = {
      menu: ['게시판','공지사항'],
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
      case MENU_SELECTED:
          return {
              menu: payload.menu,
          };
      default:
          return state;
  }
};

export default menuSelect;