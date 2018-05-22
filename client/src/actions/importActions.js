import axios from 'axios';
import {
  GET_IMPORTITEMS,
  IMPORTITEM_LOADING,
  ACTIVE_IMPORTITEM,
  GET_ERRORS,
  DELETE_IMPORTITEM
} from '../actions/types';

// Get All Importitems
export const getImportitems = () => dispatch => {
  dispatch(setImportItemLoading());
  axios
    .get('/api/importitem')
    .then(res => {
      dispatch({
        type: GET_IMPORTITEMS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_IMPORTITEMS,
        payload: null
      });
    });
};

// Create item
export const createImportItem = (item, history) => dispatch => {
  axios
    .post('/api/importitem', item)
    .then(res => history.push('/import-menu'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete item
export const deleteImportItem = id => dispatch => {
  axios
    .delete(`/api/importitem/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_IMPORTITEM,
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
export const activeImportItem = item => dispatch => {
  dispatch({
    type: ACTIVE_IMPORTITEM,
    payload: item
  });
};

// Import loading
export const setImportItemLoading = () => {
  return {
    type: IMPORTITEM_LOADING
  };
};
