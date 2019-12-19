import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import RoutesContainer from './Routes';
import { connect } from 'react-redux';
import { cards as cardsActions } from './store/ducks/cards';

import BackToTop from './components/BackToTop';

import './app.css';

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
      {loading && <p>Loading cards...</p>}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
