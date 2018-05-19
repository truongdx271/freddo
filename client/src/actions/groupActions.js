import axios from 'axios';
import {
  GROUP_LOADING,
  GET_GROUPS,
  GET_ERRORS,
  ACTIVE_GROUP
} from '../actions/types';

// Get group for item
export const getGroups = () => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get('/api/group')
    .then(res => {
      dispatch({
        type: GET_GROUPS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_GROUPS,
        payload: null
      });
    });
};

// Create group
export const createGroup = (group, history) => dispatch => {
  axios
    .post('/api/group', group)
    .then(res => history.push('/group'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set group to edit
export const activeGroup = group => dispatch => {
  dispatch({
    type: ACTIVE_GROUP,
    payload: group
  });
};

// Group loading
export const setGroupLoading = () => {
  return {
    type: GROUP_LOADING
  };
};
