import { GET_GROUPS, GROUP_LOADING } from '../actions/types';

const initialState = {
  groups: null,
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
    default:
      return state;
  }
}
