/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
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

RoutesContainer.propTypes = {
  cards: PropTypes.arrayOf(Object).isRequired,
};

export default RoutesContainer;
