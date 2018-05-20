import axios from 'axios';
import {
  GET_FALSE_ORDERS,
  GET_QUEUE_ORDERS,
  ORDER_LOADING,
  ACTIVE_ORDER,
  COMPLETE_ORDER,
  UPDATE_ORDER,
  GET_ERRORS
} from '../actions/types';

// Get All order that status = false
export const getFalseOrders = () => dispatch => {
  dispatch(setOrderLoading());
  axios
    .get('/api/order?status=false&perPage=50')
    .then(res => {
      dispatch({
        type: GET_FALSE_ORDERS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_FALSE_ORDERS,
        payload: null
      });
    });
};

// Get OrderQueue Order
export const getQueueOrders = () => dispatch => {
  dispatch(setOrderLoading());
  axios
    .get('/api/order?status=false&perPage=50')
    .then(res => {
      dispatch({
        type: GET_QUEUE_ORDERS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_QUEUE_ORDERS,
        payload: null
      });
    });
};

// Complete order
export const completeOrder = (data, id) => dispatch => {
  axios
    .post(`/api/order/complete/${id}`, data)
    .then(res => {
      dispatch({
        type: COMPLETE_ORDER,
        payload: id
      });
    })
    .catch(err => {
      dispatch({
        type: COMPLETE_ORDER,
        payload: null
      });
    });
};

// Update order
export const updateOrder = data => dispatch => {
  axios
    .post('/api/order', data)
    .then(res => {
      console.log(`ACTION ${res.data}`);
      dispatch({
        type: UPDATE_ORDER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set order to edit
export const activeOrder = order => dispatch => {
  dispatch({
    type: ACTIVE_ORDER,
    payload: order
  });
};

// Order loading
export const setOrderLoading = () => {
  return {
    type: ORDER_LOADING
  };
};
