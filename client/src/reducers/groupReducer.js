import {
  GET_GROUPS,
  GROUP_LOADING,
  ACTIVE_GROUP,
  DELETE_GROUP
} from '../actions/types';

const initialState = {
  groups: null,
  group: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GROUP_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload,
        loading: false
      };
    case ACTIVE_GROUP:
      return {
        ...state,
        group: action.payload
      };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter(group => group._id !== action.payload)
      };
    default:
      return state;
  }
}
