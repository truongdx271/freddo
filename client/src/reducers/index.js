import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import menuReducer from './menuReducer';
import groupReducer from './groupReducer';
import tableReducer from './tableReducer';
import orderReducer from './orderReducer';
import userReducer from './userReducer';
import importReducer from './importReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  menu: menuReducer,
  group: groupReducer,
  table: tableReducer,
  order: orderReducer,
  user: userReducer,
  import: importReducer
});
