/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import CardDetails from './components/CardDetails';
import Cards from './components/CardsList';

const RoutesContainer = ({ cards }) => (
  <Router>
    <Switch>
      <Route exact path="/" render={(props) => <Cards cards={cards} {...props} />} />
      <Route exact path="/cards/:id" component={CardDetails} />
    </Switch>
  </Router>
);

export default RoutesContainer;
