import React from 'react';
import {shallow} from 'enzyme';
import Home from '.';

it('should render', () => {
  expect(shallow(<Home />)).toMatchSnapshot();
});
