import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import BackToTop from './components/BackToTop';
import Header from './components/Header';
import Loader from './components/Loader';
import RoutesContainer from './Routes';
import { cards as cardsActions } from './store/ducks/cards';

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
      <Header doSearchPokemon={doSearchPokemon} />
      {loading && <Loader />}
      <RoutesContainer cards={cards} />
      <BackToTop />
    </Router>
  );
}

const mapStateToProps = (state) => ({
  loading: state.get('loading'),
  error: state.get('error'),
  cards: state.get('cards'),
});

const mapDispatchToProps = {
  fetchCards: cardsActions.fetchCards.request,
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  cards: PropTypes.objectOf(Array).isRequired,
  fetchCards: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
