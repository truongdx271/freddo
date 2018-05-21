import axios from 'axios';
import {
  USER_LOADING,
  GET_USERS,
  GET_ERRORS,
  ACTIVE_USER,
  DELETE_USER
} from '../actions/types';

// Get user
export const getUsers = () => dispatch => {
  dispatch(setUserLoading());
  axios
    .get('/api/users/all')
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_USERS,
        payload: null
      });
    });
};

// Create user
export const createUser = (user, history) => dispatch => {
  axios
    .post('/api/users', user)
    .then(res => history.push('/group'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete user
export const deleteUser = id => dispatch => {
  axios
    .delete(`/api/users/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_USER,
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

// Set user to edit
export const activeUser = user => dispatch => {
  dispatch({
    type: ACTIVE_USER,
    payload: user
  });
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
