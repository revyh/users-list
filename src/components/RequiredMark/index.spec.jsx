import React from 'react';
import {shallow} from 'enzyme';
import RequiredMark from '.';

it('should render', () => {
  expect(shallow(<RequiredMark />)).toMatchSnapshot();
});
