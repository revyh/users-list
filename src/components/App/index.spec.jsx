import React from 'react';
import {shallow} from 'enzyme';
import App from '.';

it('should render', () => {
  expect(shallow(<App />)).toMatchSnapshot();
});
