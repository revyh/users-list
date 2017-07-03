/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default function renderApp(AppComponent) {
  render(
    <AppContainer>
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <AppComponent />
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('react-root'),
  );
}
