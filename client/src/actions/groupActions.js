import axios from 'axios';
import { GROUP_LOADING, GET_GROUPS } from '../actions/types';

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

// Group loading
export const setGroupLoading = () => {
  return {
    type: GROUP_LOADING
  };
};
