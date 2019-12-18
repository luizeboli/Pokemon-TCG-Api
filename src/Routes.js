/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CardList from './components/CardList';

import Cards from './components/Cards';

const Routes = ({ cards }) => (
  <Router>
    <Switch>
      <Route exact path="/" render={(props) => <Cards cards={cards} {...props} />} />
      <Route exact path="/cards/:id" component={CardList} />
    </Switch>
  </Router>
);

export default Routes;
