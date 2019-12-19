import api from '../../api';

/** ********************************
 * TYPES
 ******************************** */
export const Types = {
  FETCH_CARDS_PENDING: 'FETCH_CARDS_PENDING',
  FETCH_CARDS_SUCCESS: 'FETCH_CARDS_SUCCESS',
  FETCH_CARDS_ERROR: 'FETCH_CARDS_ERROR',
};

/** ********************************
 * STATE
 ******************************** */
const INITAL_STATE = {
  cards: [],
  loading: false,
  error: false,
};

/** ********************************
 * ACTIONS
 ******************************** */
export const ActionCreators = {
  fetchCardsPending: () => ({
    type: Types.FETCH_CARDS_PENDING,
  }),

  fetchCardsSuccess: (payload) => ({
    type: Types.FETCH_CARDS_SUCCESS,
    payload,
  }),

  fetchCardsFailure: (payload) => ({
    type: Types.FETCH_CARDS_ERROR,
    payload,
  }),
};

/** ********************************
 * ACTIONS (THUNK)
 ******************************** */

export const fetchCards = () => (dispatch) => {
  dispatch(ActionCreators.fetchCardsPending());
  api.get('/cards')
    .then((response) => dispatch(ActionCreators.fetchCardsSuccess(response.data.cards)))
    .catch((error) => dispatch(ActionCreators.fetchCardsFailure(error)));
};

export const fetchCardByPokeName = (input) => (dispatch) => {
  dispatch(ActionCreators.fetchCardsPending());
  api.get(`/cards?name=${input}`)
    .then((response) => dispatch(ActionCreators.fetchCardsSuccess(response.data.cards)))
    .catch((error) => dispatch(ActionCreators.fetchCardsFailure(error)));
};


/** ********************************
 * REDUCER
 ******************************** */
export const reducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case Types.FETCH_CARDS_PENDING:
    return {
      ...state,
      loading: true,
      error: false,
    };
  case Types.FETCH_CARDS_SUCCESS:
    return {
      ...state,
      cards: action.payload,
      loading: false,
      error: false,
    };

  case Types.FETCH_CARDS_ERROR:
    return {
      ...state,
      loading: false,
      error: true,
    };

  default:
    return state;
  }
};
