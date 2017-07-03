function group(users) {
  return users.reduce(
    (result, user) => {
      const department = user.department || 'No department';

      if (!result[department])
        result[department] = [];

      result[department].push(user);
      return result;
    },
    {},
  );
}

export function getUsers(state) {
  const {users, isGrouped, byOrder} = state;
  const result = byOrder.map(id => users[id]);

  return isGrouped
    ? group(result)
    : result;
}

export function getOrder(state) {
  return state.order;
}

export function getGrouping(state) {
  return state.isGrouped;
}

export function getLoadState(state) {
  return state.loadState;
}

export function getAddUsersErrors(firstName, lastName) {
  const errors = {};

  if (!firstName)
    errors.firstName = 'This field is required';

  if (!lastName)
    errors.lastName = 'This field is required';

  return Object.keys(errors).length
    ? errors
    : null;
}
