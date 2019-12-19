import { FETCH_CARDS_PENDING, FETCH_CARDS_SUCCESS, FETCH_CARDS_ERROR } from '../types';

export const test = () => {};

export const fetchCardsPending = () => ({
  type: FETCH_CARDS_PENDING,
});

export const fetchCardsSuccess = (payload) => ({
  type: FETCH_CARDS_SUCCESS,
  payload,
});

export const fetchCardsFailure = (payload) => ({
  type: FETCH_CARDS_ERROR,
  payload,
});
