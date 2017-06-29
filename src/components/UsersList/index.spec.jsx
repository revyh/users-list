import React from 'react';
import {shallow} from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import UsersList from '.';

function shallowWithContext(node) {
  return shallow(node, {context: {muiTheme: getMuiTheme()}}).shallow();
}

function getUsers() {
  return [
    {
      id: 'someId',
      firstName: 'SomeFirstName',
      lastName: 'SomeLastName',
      department: 'Some department',
    },
    {
      id: 'anotherId',
      firstName: 'AnotherFirstName',
      lastName: 'AnotherLastName',
      department: 'Another department',
    },
  ];
}

it('should render', () => {
  expect(shallowWithContext(<UsersList users={getUsers()} />))
    .toMatchSnapshot();
});

it('should render ordered', () => {
  expect(shallowWithContext(<UsersList order="ascending" users={getUsers()} />))
    .toMatchSnapshot();

  expect(shallowWithContext(<UsersList order="descending" users={getUsers()} />))
    .toMatchSnapshot();
});

it('should render grouped', () => {
  const users = {
    'Some department': [
      {
        id: 'someId',
        firstName: 'SomeFirstName',
        lastName: 'SomeLastName',
        department: 'Some department',
      },
    ],
    'Another department': [
      {
        id: 'anotherId',
        firstName: 'AnotherFirstName',
        lastName: 'AnotherLastName',
        department: 'Another department',
      },
    ],
  };

  expect(shallowWithContext(<UsersList isGrouped users={users} />))
    .toMatchSnapshot();
});

it('should trigger \'onGroupingChange\' event handler', () => {
  const mockOnGroupingChange = jest.fn();
  const usersList = shallowWithContext(
    <UsersList users={getUsers()} onGroupingChange={mockOnGroupingChange} />,
  );

  usersList.findWhere(
    node => node.name() === 'ListItem' && node.key() === 'grouping',
  ).simulate('touchTap');

  expect(mockOnGroupingChange).toHaveBeenCalledWith(true);
});

it('should trigger \'onOrderChange\' event handler', () => {
  const mockOnOrderChange = jest.fn();
  const usersList = shallowWithContext(
    <UsersList users={getUsers()} onOrderChange={mockOnOrderChange} />,
  );

  const orderItem = usersList.findWhere(
    node => node.name() === 'ListItem' && node.key() === 'order',
  );

  orderItem.simulate('touchTap');
  expect(mockOnOrderChange).toHaveBeenCalledWith('ascending');
  mockOnOrderChange.mockClear();
  usersList.setProps({order: 'ascending'});

  orderItem.simulate('touchTap');
  expect(mockOnOrderChange).toHaveBeenCalledWith('descending');
  mockOnOrderChange.mockClear();
  usersList.setProps({order: 'descending'});

  orderItem.simulate('touchTap');
  expect(mockOnOrderChange).toHaveBeenCalledWith('none');
});
