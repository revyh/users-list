/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

export default function renderApp(AppComponent) {
  render(
    <AppContainer>
      <AppComponent />
    </AppContainer>,
    document.getElementById('react-root'),
  );
}
