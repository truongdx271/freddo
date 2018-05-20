import {
  GET_TABLES,
  TABLE_LOADING,
  ACTIVE_TABLE,
  DELETE_TABLE,
  UPDATE_STATUS_TABLE
} from '../actions/types';

const initialState = {
  tables: null,
  table: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TABLE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TABLES:
      return {
        ...state,
        tables: action.payload,
        loading: false
      };
    case ACTIVE_TABLE:
      return {
        ...state,
        table: action.payload
      };
    case UPDATE_STATUS_TABLE:
      const index = state.tables.findIndex(x => x._id === action.payload._id);
      state.tables.splice(index, 1, action.payload);
      return {
        ...state
      };
    case DELETE_TABLE:
      return {
        ...state,
        tables: state.tables.filter(table => table._id !== action.payload)
      };
    default:
      return state;
  }
}
