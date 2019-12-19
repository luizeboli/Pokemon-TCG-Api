/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CardDetails from './components/CardDetails';
import CardsList from './components/CardsList';

const RoutesContainer = ({ cards }) => (
  <>
    <Switch>
      <Route exact path="/" render={(props) => <CardsList cards={cards} {...props} />} />
      <Route exact path="/cards/:id" component={CardDetails} />
    </Switch>
  </>
);

export default RoutesContainer;
