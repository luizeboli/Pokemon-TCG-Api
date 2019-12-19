import { FETCH_CARDS_PENDING, FETCH_CARDS_SUCCESS, FETCH_CARDS_ERROR } from '../types';

const INITAL_STATE = {
  cards: [],
  loading: false,
  error: false,
};

const cardsReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CARDS_PENDING:
    return {
      ...state,
      loading: true,
      error: false,
    };
  case FETCH_CARDS_SUCCESS:
    return {
      ...state,
      cards: state.cards.concat(action.payload),
      loading: true,
      error: false,
    };

  case FETCH_CARDS_ERROR:
    return {
      ...state,
      loading: false,
      error: true,
    };

  default:
    return state;
  }
};

export default cardsReducer;
