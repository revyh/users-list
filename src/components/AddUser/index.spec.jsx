import React from 'react';
import {shallow} from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AddUser from '.';

function shallowWithContext(node) {
  return shallow(node, {context: {muiTheme: getMuiTheme()}});
}

function getTextField(root, key) {
  return root.findWhere(
    node => node.name() === 'TextField' && node.key() === key,
  );
}

it('should render', () => {
  expect(shallow(<AddUser />)).toMatchSnapshot();
});

it('should open dialog when floating action button clicked', () => {
  const addUser = shallow(<AddUser />);

  addUser.children('FloatingActionButton').simulate('touchTap');

  expect(addUser.children('Dialog').prop('open')).toBeTruthy();
});

it('should close dialog when clicked outside', () => {
  const addUser = shallow(<AddUser />);

  addUser.children('FloatingActionButton').simulate('touchTap');
  addUser.children('Dialog').simulate('requestClose');

  expect(addUser.children('Dialog').prop('open')).toBeFalsy();
});

it('should close dialog when clicked on dialog \'cancel\' button', () => {
  const addUser = shallow(<AddUser />);

  addUser.children('FloatingActionButton').simulate('touchTap');
  shallowWithContext(addUser.children('Dialog').prop('actions')[0])
    .simulate('touchTap');

  expect(addUser.children('Dialog').prop('open')).toBeFalsy();
});

it('should close dialog when clicked on dialog \'add\' button', () => {
  const addUser = shallow(<AddUser />);

  addUser.children('FloatingActionButton').simulate('touchTap');
  shallowWithContext(addUser.children('Dialog').prop('actions')[1])
    .simulate('touchTap');

  expect(addUser.children('Dialog').prop('open')).toBeFalsy();
});

it('should pass firstName and lastName to validation function', () => {
  const mockGetErrors = jest.fn();
  const addUser = shallow(<AddUser getErrors={mockGetErrors} />);

  addUser.children('FloatingActionButton').simulate('touchTap');
  getTextField(addUser, 'firstName')
    .simulate('change', {target: {value: 'some first name'}});
  getTextField(addUser, 'lastName')
    .simulate('change', {target: {value: 'some last name'}});

  expect(mockGetErrors)
    .toHaveBeenLastCalledWith('some first name', 'some last name');
});

it('should disable dialog \'add\' button if data is invalid', () => {
  const addUser = shallow(<AddUser getErrors={jest.fn(() => true)} />);

  addUser.children('FloatingActionButton').simulate('touchTap');
  const button = addUser.children('Dialog').prop('actions')[1];

  expect(shallowWithContext(button).prop('disabled')).toBeTruthy();
});

it('should enable dialog \'add\' button if data is valid', () => {
  const addUser = shallow(<AddUser getErrors={jest.fn(() => false)} />);

  addUser.children('FloatingActionButton').simulate('touchTap');
  const button = addUser.children('Dialog').prop('actions')[1];

  expect(shallowWithContext(button).prop('disabled')).toBeFalsy();
});

it('should trigger \'onAdd\' when clicked on \'add\' button', () => {
  const mockOnAdd = jest.fn();
  const addUser = shallow(<AddUser onAdd={mockOnAdd} />);

  addUser.children('FloatingActionButton').simulate('touchTap');

  getTextField(addUser, 'firstName')
    .simulate('change', {target: {value: 'some first name'}});
  getTextField(addUser, 'lastName')
    .simulate('change', {target: {value: 'some last name'}});
  getTextField(addUser, 'department')
    .simulate('change', {target: {value: 'some department'}});

  shallowWithContext(addUser.children('Dialog').prop('actions')[1])
    .simulate('touchTap');

  expect(mockOnAdd).toHaveBeenCalledWith(
    'some first name',
    'some last name',
    'some department',
  );
});
