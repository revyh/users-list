/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {AppContainer} from 'react-hot-loader';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default function renderApp(AppComponent, store) {
  render(
    <Provider store={store}>
      <AppContainer>
        <Router>
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <AppComponent />
          </MuiThemeProvider>
        </Router>
      </AppContainer>
    </Provider>,
    document.getElementById('react-root'),
  );
}
