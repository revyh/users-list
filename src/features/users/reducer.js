import * as types from './actionTypes';
import binarySearch from 'utils/binarySearch';

const DEFAULT_STATE = {
  order: 'none',
  isGrouped: false,
  users: {},
  byOrder: [],
  loadState: 'success',
};

function compareUsers(users, order, id1, id2) {
  const name1 = users[id1].lastName + users[id1].firstName;
  const name2 = users[id2].lastName + users[id2].firstName;

  return order === 'ascending'
    ? name1.localeCompare(name2)
    : name2.localeCompare(name1);
}

function getOrderedUsers(users, order) {
  const result = Object.keys(users);

  if (order !== 'none')
    result.sort(compareUsers.bind(null, users, order));

  return result;
}

function load(state, users) {
  const usersMap = users.reduce(
    (result, user) => {
      result[user.id] = user;
      return result;
    },
    {},
  );

  return {
    ...state,
    loadState: 'success',
    users: usersMap,
    byOrder: getOrderedUsers(usersMap, state.order),
  };
}

function add(state, user) {
  const users = {...state.users, [user.id]: user};
  const byOrder = [...state.byOrder];

  if (state.order === 'none' || !byOrder.length) {
    byOrder.push(user.id);
  } else if (byOrder.length === 1) {
    compareUsers(users, state.order, byOrder[0], user.id) > 0
      ? byOrder.unshift(user.id)
      : byOrder.push(user.id);
  } else {
    const insertInd = binarySearch(
      byOrder,
      user.id,
      compareUsers.bind(null, users, state.order),
    );

    byOrder.splice(insertInd + 1, 0, user.id);
  }

  return {
    ...state,
    users,
    byOrder,
  };
}

export default function reducer(state = DEFAULT_STATE, {type, payload}) {
  switch (type) {
    case types.LOAD_USERS_START:
      return {...state, users: {}, byOrder: [], loadState: 'loading'};

    case types.LOAD_USERS_SUCCESS:
      return load(state, payload);

    case types.LOAD_USERS_FAIL:
      return {...state, loadState: 'fail'};

    case types.SET_USERS_ORDER:
      return {
        ...state,
        order: payload,
        byOrder: getOrderedUsers(state.users, payload),
      };

    case types.SET_USERS_GROUPING:
      return {...state, isGrouped: payload};

    case types.ADD_USER:
      return add(state, payload);

    default:
      return state;
  }
}
