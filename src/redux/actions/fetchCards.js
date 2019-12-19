import { fetchCardsPending, fetchCardsSuccess, fetchCardsFailure } from './index';
import api from '../../api';

export const fetchCards = () => (dispatch) => {
  dispatch(fetchCardsPending());
  api.get('/cards')
    .then((response) => dispatch(fetchCardsSuccess(response.data.cards)))
    .catch((error) => dispatch(fetchCardsFailure(error)));
};

export const fetchCardByPokeName = (input) => (dispatch) => {
  dispatch(fetchCardsPending());
  api.get(`/cards?name=${input}`)
    .then((response) => dispatch(fetchCardsSuccess(response.data.cards)))
    .catch((error) => dispatch(fetchCardsFailure(error)));
};
