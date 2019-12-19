import { fork } from 'redux-saga/effects';

import { saga as cardSaga } from './ducks/cards';

export default function* rootSaga() {
  yield fork(cardSaga);
}
