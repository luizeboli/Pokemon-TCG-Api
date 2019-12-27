/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import CardDetails from './components/CardDetails';
import CardsList from './components/CardsList';

const RoutesContainer = ({ cards }) => (
  <AnimatePresence>
    <Switch>
      <Route exact path="/" render={(props) => <CardsList cards={cards} {...props} />} />
      <Route exact path="/cards/:id" component={CardDetails} />
    </Switch>
  </AnimatePresence>
);

RoutesContainer.propTypes = {
  cards: PropTypes.arrayOf(Object).isRequired,
};

export default RoutesContainer;
