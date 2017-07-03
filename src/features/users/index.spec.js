import deepFreeze from 'deep-freeze';
import {actions, reducer, selectors, actionTypes} from '.';

// eslint-disable-next-line no-var
var mockXhr;

jest.mock('utils/xhr', () => {
  mockXhr = mockXhr || jest.fn(() => Promise.resolve('{}'));
  return mockXhr;
});

function createState({
  order = 'none',
  isGrouped = false,
  users = {},
  byOrder = [],
  loadState = 'success',
} = {}) {
  return {order, isGrouped, users, byOrder, loadState};
}

function genActionMocks(state) {
  return {
    mockDispatch: jest.fn(),
    mockGetState: jest.fn(() => state || createState()),
  };
}

describe('actions', () => {
  it('should create \'loadUsers\' start action', () => {
    const {mockDispatch, mockGetState} = genActionMocks();

    actions.loadUsers('some-media-url')(mockDispatch, mockGetState);

    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: actionTypes.LOAD_USERS_START,
    });
  });

  it('should create \'loadUsers\' success action', () => {
    const mockUsers = [
      {
        id: 'someId',
        firstName: 'some first name',
        lastName: 'some last name',
        department: 'some department',
      }, {
        id: 'anotherId',
        firstName: 'another first name',
        lastName: 'another last name',
      },
    ];
    const {mockDispatch, mockGetState} = genActionMocks();
    const mockPromise = Promise.resolve(JSON.stringify(mockUsers));
    mockXhr.mockReturnValueOnce(mockPromise);

    actions.loadUsers('some-media-url')(mockDispatch, mockGetState);

    return mockPromise.then(() => {
      expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: actionTypes.LOAD_USERS_SUCCESS,
        payload: mockUsers,
      });
    });
  });

  it('should create \'loadUsers\' fail action', () => {
    const {mockDispatch, mockGetState} = genActionMocks();
    const mockError = new Error('some error');
    mockError.status = 404;
    mockError.statusText = '404';

    const mockPromise = Promise.reject(mockError);
    mockXhr.mockReturnValueOnce(mockPromise);

    actions.loadUsers('some-media-url')(mockDispatch, mockGetState);

    return mockPromise.catch(() => {
      expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: actionTypes.LOAD_USERS_FAIL,
        payload: mockError,
      });
    });
  });

  it('should create \'setUsersOrder\' action', () => {
    expect(actions.setUsersOrder('ascending')).toEqual({
      type: actionTypes.SET_USERS_ORDER,
      payload: 'ascending',
    });
  });

  it('should create \'setUsersGrouping\' action', () => {
    expect(actions.setUsersGrouping(true)).toEqual({
      type: actionTypes.SET_USERS_GROUPING,
      payload: true,
    });
  });

  it('should create \'addUser\' action', () => {
    const action = actions.addUser(
      'some first name',
      'some last name',
      'some department',
    );

    expect(action).toEqual({
      type: actionTypes.ADD_USER,
      payload: {
        id: expect.any(String),
        firstName: 'some first name',
        lastName: 'some last name',
        department: 'some department',
      },
    });
  });
});


describe('reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, {})).toEqual({
      order: 'none',
      isGrouped: false,
      users: {},
      byOrder: [],
      loadState: 'success',
    });
  });

  it('should not change state on unknown action', () => {
    const state = createState();

    expect(reducer(state, {type: 'UNKNOWN_ACTION'})).toBe(state);
  });

  it('should reset state when users start loading', () => {
    const state = createState({
      users: {
        someId: {
          id: 'someId',
          firstName: 'some first name',
          lastName: 'some last name',
          department: 'some department',
        },
      },
      byOrder: ['someId'],
      loadState: 'success',
    });
    const action = {
      type: actionTypes.LOAD_USERS_START,
    };

    deepFreeze(state);

    expect(reducer(state, action)).toEqual({
      ...state,
      users: {},
      byOrder: [],
      loadState: 'loading',
    });
  });

  it('should set users on success load', () => {
    const state = createState({
      loadState: 'loading',
    });
    const action = {
      type: actionTypes.LOAD_USERS_SUCCESS,
      payload: [
        {
          id: 'someId',
          firstName: 'some first name',
          lastName: 'some last name',
          department: 'some department',
        },
      ],
    };

    deepFreeze(state);

    expect(reducer(state, action)).toEqual({
      ...state,
      users: {
        someId: {
          id: 'someId',
          firstName: 'some first name',
          lastName: 'some last name',
          department: 'some department',
        },
      },
      byOrder: ['someId'],
      loadState: 'success',
    });
  });

  it('should set loadState if load fails', () => {
    const state = createState({
      loadState: 'loading',
    });
    const action = {
      type: actionTypes.LOAD_USERS_FAIL,
      payload: 'SomeError',
    };

    deepFreeze(state);

    expect(reducer(state, action)).toEqual({
      ...state,
      loadState: 'fail',
    });
  });

  it('should set users order', () => {
    function expectOrder(currentState, order, expected) {
      const action = {
        type: actionTypes.SET_USERS_ORDER,
        payload: order,
      };
      deepFreeze(currentState);
      const nextState = reducer(currentState, action);

      expect(nextState).toEqual({
        ...currentState,
        byOrder: expected,
        order,
      });

      return nextState;
    }

    let state = createState({
      users: {
        user2: {
          id: 'user2',
          firstName: 'user2',
          lastName: 'last name',
        },
        user1: {
          id: 'user1',
          firstName: 'user1',
          lastName: 'last name',
        },
        user3: {
          id: 'user3',
          firstName: 'user3',
          lastName: 'last name',
        },
      },
      byOrder: ['user2', 'user1', 'user3'],
      order: 'none',
    });

    state = expectOrder(state, 'ascending', ['user1', 'user2', 'user3']);
    state = expectOrder(state, 'descending', ['user3', 'user2', 'user1']);
    expectOrder(state, 'none', ['user2', 'user1', 'user3']);
  });

  it('should reorder loaded users', () => {
    const mockUsers = {
      user2: {
        id: 'user2',
        firstName: 'user2',
        lastName: 'last name',
      },
      user1: {
        id: 'user1',
        firstName: 'user1',
        lastName: 'last name',
      },
      user3: {
        id: 'user3',
        firstName: 'user3',
        lastName: 'last name',
      },
    };
    const state = createState({
      loadState: 'loading',
      order: 'ascending',
    });
    const action = {
      type: actionTypes.LOAD_USERS_SUCCESS,
      payload: [
        mockUsers.user2,
        mockUsers.user1,
        mockUsers.user3,
      ],
    };

    deepFreeze(state);

    expect(reducer(state, action)).toEqual({
      ...state,
      users: mockUsers,
      byOrder: ['user1', 'user2', 'user3'],
      loadState: 'success',
      order: 'ascending',
    });
  });

  it('should set users grouping', () => {
    const state = createState({
      isGrouped: false,
    });
    const action = {
      type: actionTypes.SET_USERS_GROUPING,
      payload: true,
    };

    deepFreeze(state);

    expect(reducer(state, action)).toEqual({
      ...state,
      isGrouped: true,
    });
  });

  it('should add new user', () => {
    const mockUsers = {
      user2: {
        id: 'user2',
        firstName: 'user2',
        lastName: 'last name',
      },
      user1: {
        id: 'user1',
        firstName: 'user1',
        lastName: 'last name',
      },
      user4: {
        id: 'user4',
        firstName: 'user4',
        lastName: 'last name',
      },
      user3: {
        id: 'user3',
        firstName: 'user3',
        lastName: 'last name',
      },
    };
    const state = createState({
      users: {
        user2: mockUsers.user2,
        user1: mockUsers.user1,
        user4: mockUsers.user4,
      },
      byOrder: ['user1', 'user2', 'user4'],
      order: 'ascending',
    });
    const action = {
      type: actionTypes.ADD_USER,
      payload: mockUsers.user3,
    };

    deepFreeze(state);

    expect(reducer(state, action)).toEqual({
      ...state,
      users: mockUsers,
      byOrder: ['user1', 'user2', 'user3', 'user4'],
    });
  });
});

describe('selectors', () => {
  const mockUsers = {
    user2: {
      id: 'user2',
      firstName: 'user2',
      lastName: 'last name',
      department: 'department1',
    },
    user1: {
      id: 'user1',
      firstName: 'user1',
      lastName: 'last name',
      department: 'department2',
    },
    user3: {
      id: 'user3',
      firstName: 'user3',
      lastName: 'last name',
      department: 'department1',
    },
  };

  it('should select ordered users', () => {
    const state = createState({
      users: mockUsers,
      byOrder: ['user1', 'user2', 'user3'],
      order: 'ascending',
    });

    expect(selectors.getUsers(state)).toEqual([
      mockUsers.user1,
      mockUsers.user2,
      mockUsers.user3,
    ]);
  });

  it('should select grouped users', () => {
    const state = createState({
      users: mockUsers,
      isGrouped: true,
      byOrder: ['user1', 'user2', 'user3'],
      order: 'ascending',
    });

    expect(selectors.getUsers(state)).toEqual({
      department1: [
        mockUsers.user2,
        mockUsers.user3,
      ],
      department2: [mockUsers.user1],
    });
  });

  it('should select order', () => {
    const state = createState({order: 'descending'});

    expect(selectors.getOrder(state)).toBe('descending');
  });

  it('should select grouping', () => {
    const state = createState({isGrouped: true});

    expect(selectors.getGrouping(state)).toBeTruthy();
  });

  it('should select load state', () => {
    const state = createState({loadState: 'loading'});

    expect(selectors.getLoadState(state)).toBe('loading');
  });

  it('should validate new user data', () => {
    expect(selectors.getAddUsersErrors('firstName', 'lastName')).toBeNull();
    expect(selectors.getAddUsersErrors()).toEqual({
      firstName: 'This field is required',
      lastName: 'This field is required',
    });
  });
});
