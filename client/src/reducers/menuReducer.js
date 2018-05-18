import {
  GET_MENUITEMS,
  MENU_LOADING,
  ACTIVE_ITEM,
  DELETE_ITEM
} from '../actions/types';

const initialState = {
  menuitems: null,
  item: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MENU_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MENUITEMS:
      return {
        ...state,
        menuitems: action.payload,
        loading: false
      };
    case ACTIVE_ITEM:
      return {
        ...state,
        item: action.payload
      };
    case DELETE_ITEM:
      return {
        ...state,
        menuitems: state.menuitems.filter(item => item._id !== action.payload)
      };
    default:
      return state;
  }
}
