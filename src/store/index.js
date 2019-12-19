import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as cardsReducer } from './ducks/cards';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const store = createStore(
  cardsReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares),
  ),
);

export default store;
