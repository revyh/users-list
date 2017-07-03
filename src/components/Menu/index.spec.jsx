import React from 'react';
import {shallow} from 'enzyme';
import Menu from '.';

function getLinks() {
  return [
    {route: '/some-route', name: 'Some Name'},
    {route: '/another-route', name: 'Another Name'},
  ];
}

it('should render', () => {
  expect(shallow(<Menu links={getLinks()} />)).toMatchSnapshot();
});

it('should render in opened state', () => {
  const menu = shallow(<Menu links={getLinks()} />);

  menu.setState({isOpen: true});
  expect(menu).toMatchSnapshot();
});

it('should toggle menu when icon button is clicked', () => {
  const menu = shallow(<Menu links={getLinks()} />);

  menu.children('IconButton').simulate('touchTap');

  expect(menu.children('Drawer').prop('open')).toBeTruthy();
});

it('should close menu when menu item is clicked', () => {
  const menu = shallow(<Menu links={getLinks()} />);

  menu.children('IconButton').simulate('touchTap');
  menu.find('MenuItem').first().simulate('touchTap');

  expect(menu.children('Drawer').prop('open')).toBeFalsy();
});

it('should close menu when clicked outside opened menu', () => {
  const menu = shallow(<Menu links={getLinks()} />);

  menu.children('IconButton').simulate('touchTap');
  menu.children('Drawer').simulate('requestChange');

  expect(menu.children('Drawer').prop('open')).toBeFalsy();
});
