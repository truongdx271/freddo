import axios from 'axios';
import {
  TABLE_LOADING,
  GET_TABLES,
  GET_ERRORS,
  ACTIVE_TABLE,
  DELETE_TABLE,
  UPDATE_STATUS_TABLE
} from '../actions/types';

// Get table
export const getTables = () => dispatch => {
  dispatch(setTableLoading());
  axios
    .get('/api/table')
    .then(res => {
      dispatch({
        type: GET_TABLES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_TABLES,
        payload: null
      });
    });
};

// Create table
export const createTable = (table, history) => dispatch => {
  axios
    .post('/api/table', table)
    .then(res => history.push('/table'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update empty table
export const updateEmptyTable = table => dispatch => {
  axios
    .post('/api/table', table)
    .then(res =>
      dispatch({
        type: UPDATE_STATUS_TABLE,
        payload: table
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete table
export const deleteTable = id => dispatch => {
  axios
    .delete(`/api/table/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_TABLE,
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

// Set table to edit
export const activeTable = table => dispatch => {
  dispatch({
    type: ACTIVE_TABLE,
    payload: table
  });
};

// Group loading
export const setTableLoading = () => {
  return {
    type: TABLE_LOADING
  };
};
