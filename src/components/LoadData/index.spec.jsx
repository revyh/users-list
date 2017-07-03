import React from 'react';
import {shallow, mount} from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LoadData from '.';

function mountWithContext(node) {
  return mount(
    <MuiThemeProvider muiTheme={getMuiTheme()}>{node}</MuiThemeProvider>,
  );
}

it('should render', () => {
  expect(shallow(<LoadData>some content</LoadData>)).toMatchSnapshot();
});

it('should render loading', () => {
  expect(shallow(<LoadData loadState="loading">some content</LoadData>))
    .toMatchSnapshot();
});

it('should render failed', () => {
  expect(shallow(<LoadData loadState="fail">some content</LoadData>))
    .toMatchSnapshot();
});

it('should trigger \'onLoad\' on mount', () => {
  const mockOnLoad = jest.fn();

  mountWithContext(<LoadData onLoad={mockOnLoad}>some content</LoadData>);

  expect(mockOnLoad).toHaveBeenCalled();
});

it('should not trigger \'onLoad\' on mount if data already loading', () => {
  const mockOnLoad = jest.fn();

  mountWithContext(
    <LoadData loadState="loading" onLoad={mockOnLoad}>some content</LoadData>,
  );

  expect(mockOnLoad).not.toHaveBeenCalled();
});

it('should trigger \'onLoad\' on fail', () => {
  const mockOnLoad = jest.fn();

  const loadData = shallow(
    <LoadData loadState="fail" onLoad={mockOnLoad}>some content</LoadData>,
  );

  loadData.children('Snackbar').simulate('actionTouchTap');

  expect(mockOnLoad).toHaveBeenCalled();
});
