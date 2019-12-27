import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import BackToTop from './components/BackToTop';
import Header from './components/Header';
import Loader from './components/Loader';
import RoutesContainer from './Routes';
import {
  cards as cardsActions, makeSelectLoading, makeSelectCards, makeSelectError,
} from './store/ducks/cards';
import GlobalStyle from './styles/global';


function App({
  loading, cards, fetchCards,
}) {
  useEffect(() => {
    fetchCards();
  }, []);

  const doSearchPokemon = (input) => {
    fetchCards(input);
  };

  return (
    <Router>
      <GlobalStyle />
      {loading && <Loader />}

      <Header doSearchPokemon={doSearchPokemon} />
      <RoutesContainer cards={cards} />
      <BackToTop />
    </Router>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading,
  error: makeSelectError,
  cards: makeSelectCards,
});

const mapDispatchToProps = {
  fetchCards: cardsActions.fetchCards.request,
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  cards: PropTypes.arrayOf(Object).isRequired,
  fetchCards: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
