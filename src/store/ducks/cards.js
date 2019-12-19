import { createActions, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';


/** ********************************
 * TYPES
 ******************************** */
// export const Types = {
//   FETCH_CARDS_REQUEST: 'FETCH_CARDS_REQUEST',
//   FETCH_CARDS_PENDING: 'FETCH_CARDS_PENDING',
//   FETCH_CARDS_SUCCESS: 'FETCH_CARDS_SUCCESS',
//   FETCH_CARDS_ERROR: 'FETCH_CARDS_ERROR',
// };

/** ********************************
 * STATE
 ******************************** */
const INITIAL_STATE = {
  cards: [],
  loading: false,
  error: false,
};

/** ********************************
 * ACTIONS
 ******************************** */
const requestPattern = { REQUEST: undefined, SUCCESS: undefined, FAILURE: undefined };

export const actions = createActions({
  cards: {
    FETCH_CARDS: requestPattern,
  },
});

export const reducer = handleActions({
  [actions.cards.fetchCards.request](state) {
    return {
      ...state,
      loading: true,
      error: false,
    };
  },
  [actions.cards.fetchCards.success](state, { payload }) {
    return {
      ...state,
      cards: payload,
      loading: false,
      error: false,
    };
  },
  [actions.cards.fetchCards.failure]() {
    return {
      cards: [],
      loading: false,
      error: true,
    };
  },
}, INITIAL_STATE);

// export const ActionCreators = {
//   fetchCardsRequest: (payload) => ({
//     type: Types.FETCH_CARDS_REQUEST,
//     payload,
//   }),

//   fetchCardsSuccess: (payload) => ({
//     type: Types.FETCH_CARDS_SUCCESS,
//     payload,
//   }),

//   fetchCardsFailure: (payload) => ({
//     type: Types.FETCH_CARDS_ERROR,
//     payload,
//   }),
// };

/** ********************************
 * (SAGA)
 ******************************** */

function* fetchCards(action) {
  try {
    let response;
    if (action.payload) {
      response = yield call(api.get, `/cards?name=${action.payload}`);
    } else {
      response = yield call(api.get, '/cards');
    }
    yield put(actions.cards.fetchCards.success(response.data.cards));
  } catch (error) {
    yield put(actions.cards.fetchCards.failure(error));
  }
}

export function* saga() {
  yield takeLatest(actions.cards.fetchCards.request, fetchCards);
}

/** ********************************
 * REDUCER
 ******************************** */
// export const reducer = (state = INITAL_STATE, action) => {
//   switch (action.type) {
//   case Types.FETCH_CARDS_REQUEST:
//     return {
//       ...state,
//       loading: true,
//       error: false,
//     };
//   case Types.FETCH_CARDS_SUCCESS:
//     return {
//       ...state,
//       cards: action.payload,
//       loading: false,
//       error: false,
//     };

//   case Types.FETCH_CARDS_ERROR:
//     return {
//       cards: [],
//       loading: false,
//       error: true,
//     };

//   default:
//     return state;
//   }
// };
