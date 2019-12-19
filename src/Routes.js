/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import CardDetails from './components/CardDetails';
import CardsList from './components/CardsList';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

const RoutesContainer = ({ cards }) => (
  <>
    <Switch>
      <Route exact path="/" render={(props) => <CardsList cards={cards} {...props} />} />
      <Route exact path="/cards/:id" component={CardDetails} />
    </Switch>
  </>
);

RoutesContainer.propTypes = {
  cards: PropTypes.objectOf(Array).isRequired,
};

export default RoutesContainer;
