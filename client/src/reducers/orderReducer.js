import {
  GET_FALSE_ORDERS,
  ORDER_LOADING,
  ACTIVE_ORDER
} from '../actions/types';

const initialState = {
  orders: null,
  order: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ORDER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_FALSE_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    case ACTIVE_ORDER:
      return {
        ...state,
        order: action.payload
      };
    default:
      return state;
  }
}
