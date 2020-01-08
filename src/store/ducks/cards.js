import { fromJS, List } from 'immutable';
import { createActions, handleActions } from 'redux-actions';
import {
  call, delay, put, takeLatest,
} from 'redux-saga/effects';
import { createSelector } from 'reselect';
import api from '../../api';

/** ********************************
 * STATE
 ******************************** */
const INITIAL_STATE = fromJS({
  cards: [],
  loading: false,
  error: false,
});

/** ********************************
 * ACTIONS
 ******************************** */
const requestPattern = { REQUEST: undefined, SUCCESS: undefined, FAILURE: undefined };

const actions = createActions({
  cards: {
    FETCH_CARDS: requestPattern,
  },
});

export const { cards } = actions;

/** ********************************
 * REDUCER
 ******************************** */

export const reducer = handleActions({
  [cards.fetchCards.request](state) {
    return state
      .set('loading', true)
      .set('error', false);
  },
  [cards.fetchCards.success](state, { payload }) {
    return state
      .set('cards', payload)
      .set('loading', false)
      .set('error', false);
  },
  [cards.fetchCards.failure](state) {
    return state
      .set('cards', [])
      .set('loading', false)
      .set('error', true);
  },
}, INITIAL_STATE);

/** ********************************
 * SAGA
 ******************************** */

function* fetchCards(action) {
  try {
    let response;
    if (action.payload) {
      response = yield call(api.get, `/cards?name=${action.payload}`);
    } else {
      response = yield call(api.get, '/cards');
    }
    yield delay(1000);
    yield put(cards.fetchCards.success(response.data.cards));
  } catch (error) {
    yield put(cards.fetchCards.failure(error));
  }
}

export function* saga() {
  yield takeLatest(cards.fetchCards.request, fetchCards);
}

/** ********************************
 * SELECTORS
 ******************************** */

export const makeSelectCards = createSelector((state) => state.get('cards'), (substate) => substate);
export const makeSelectLoading = createSelector((state) => state.get('loading'), (bool) => bool);
export const makeSelectError = createSelector((state) => state.get('error'), (bool) => bool);
