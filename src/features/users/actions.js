import shortid from 'shortid';
import * as actionTypes from './actionTypes';
import xhr from 'utils/xhr';

export function loadUsers(url) {
  return dispatch => {
    xhr(url).then(
      response => {
        dispatch({
          type: actionTypes.LOAD_USERS_SUCCESS,
          payload: JSON.parse(response),
        });
      },
      error => {
        dispatch({
          type: actionTypes.LOAD_USERS_FAIL,
          payload: error,
        });
      },
    );

    return dispatch({type: actionTypes.LOAD_USERS_START});
  };
}

export function setUsersOrder(order) {
  return {
    type: actionTypes.SET_USERS_ORDER,
    payload: order,
  };
}

export function setUsersGrouping(isGrouped) {
  return {
    type: actionTypes.SET_USERS_GROUPING,
    payload: isGrouped,
  };
}

export function addUser(firstName, lastName, department) {
  return {
    type: actionTypes.ADD_USER,
    payload: {
      id: shortid.generate(),
      firstName,
      lastName,
      department,
    },
  };
}
