import {
  GET_IMPORTITEMS,
  IMPORTITEM_LOADING,
  ACTIVE_IMPORTITEM,
  DELETE_IMPORTITEM
} from '../actions/types';

const initialState = {
  importitems: null,
  item: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IMPORTITEM_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_IMPORTITEMS:
      return {
        ...state,
        importitems: action.payload,
        loading: false
      };
    case ACTIVE_IMPORTITEM:
      return {
        ...state,
        item: action.payload
      };
    case DELETE_IMPORTITEM:
      return {
        ...state,
        importitems: state.importitems.filter(
          item => item._id !== action.payload
        )
      };
    default:
      return state;
  }
}
