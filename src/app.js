/* eslint-env commonjs */

import 'utils/polyfills';

import App from 'containers/App';
import configureStore from 'configureStore';
import renderApp from 'utils/renderApp';
import waitPageLoad from 'utils/waitPageLoad';
import reducer from 'features/reducer';

const store = configureStore(reducer);

waitPageLoad().then(() => renderApp(App, store));

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    import('containers/App').then(
      ({'default': NextApp}) => renderApp(NextApp, store),
    );
  });

  module.hot.accept('features/reducer', () => {
    import('features/reducer').then(
      ({'default': nextRootReducer}) => store.replaceReducer(nextRootReducer),
    );
  });
}
