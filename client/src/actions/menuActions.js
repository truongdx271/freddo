import axios from 'axios';
import {
  GET_MENUITEMS,
  MENU_LOADING,
  ACTIVE_ITEM,
  GET_ERRORS,
  DELETE_ITEM
} from '../actions/types';

// Get All Menuitems
export const getMenuitems = () => dispatch => {
  dispatch(setMenuLoading());
  axios
    .get('/api/menuitem')
    .then(res => {
      dispatch({
        type: GET_MENUITEMS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_MENUITEMS,
        payload: null
      });
    });
};

// Create item
export const createItem = (item, history) => dispatch => {
  axios
    .post('/api/menuitem', item)
    .then(res => history.push('/menu'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete item
export const deleteItem = id => dispatch => {
  axios
    .delete(`/api/menuitem/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set item to edit
export const activeItem = item => dispatch => {
  dispatch({
    type: ACTIVE_ITEM,
    payload: item
  });
};

// Menu loading
export const setMenuLoading = () => {
  return {
    type: MENU_LOADING
  };
};
