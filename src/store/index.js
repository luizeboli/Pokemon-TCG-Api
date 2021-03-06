import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { reducer as cardsReducer } from './ducks/cards';

import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
  cardsReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares),
  ),
);

sagaMiddleware.run(sagas);

export default store;
