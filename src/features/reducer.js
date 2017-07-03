import {combineReducers} from 'redux';
import {reducer as usersReducer} from './users';

export default combineReducers({
  users: usersReducer,
});
