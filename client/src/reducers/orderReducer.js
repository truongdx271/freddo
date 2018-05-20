import {
  GET_FALSE_ORDERS,
  ORDER_LOADING,
  ACTIVE_ORDER,
  COMPLETE_ORDER,
  UPDATE_ORDER,
  GET_QUEUE_ORDERS
} from '../actions/types';

const initialState = {
  orders: null,
  queueOrders: null,
  order: null,
  loading: false
};

const isServed = data => {
  let isTrue = true;
  data.listitems.forEach(item => {
    isTrue &= item.status;
  });
  return !isTrue;
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
    case GET_QUEUE_ORDERS:
      return {
        ...state,
        queueOrders: action.payload.filter(isServed),
        loading: false
      };
    case ACTIVE_ORDER:
      return {
        ...state,
        order: action.payload
      };
    case UPDATE_ORDER:
      return {
        ...state,
        order: action.payload
      };
    case COMPLETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order._id !== action.payload)
      };
    default:
      return state;
  }
}
