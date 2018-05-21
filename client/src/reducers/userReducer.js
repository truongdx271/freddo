import {
  GET_USERS,
  USER_LOADING,
  DELETE_USER,
  ACTIVE_USER
} from '../actions/types';

const initialState = {
  users: null,
  user: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case ACTIVE_USER:
      return {
        ...state,
        user: action.payload
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    default:
      return state;
  }
}
