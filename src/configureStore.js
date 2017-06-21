import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export default function configureStore(rootReducer) {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
  /* eslint-enable no-underscore-dangle */

  const enhancer = composeEnhancers(
    applyMiddleware(thunk),
  );

  return createStore(rootReducer, enhancer);
}
