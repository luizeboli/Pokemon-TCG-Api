import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
if (module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
