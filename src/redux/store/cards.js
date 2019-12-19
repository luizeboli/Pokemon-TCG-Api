import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import cardsReducer from '../reducers/cardsReducer';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const store = createStore(
  cardsReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares),
  ),
);

export default store;
