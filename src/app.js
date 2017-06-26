/* eslint-env commonjs */

import 'core-js';

import App from 'components/App';
import renderApp from 'utils/renderApp';
import waitPageLoad from 'utils/waitPageLoad';

waitPageLoad().then(() => renderApp(App));

if (module.hot)
  module.hot.accept('./components/App', () => {
    import('components/App').then(
      ({'default': NextApp}) => renderApp(NextApp),
    );
  });
