import axios from 'axios';
import {
  GET_FALSE_ORDERS,
  ORDER_LOADING,
  ACTIVE_ORDER,
  COMPLETE_ORDER
} from '../actions/types';

// Get All order that status = false
export const getFalseOrders = () => dispatch => {
  dispatch(setOrderLoading());
  axios
    .get('/api/order?status=false')
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
