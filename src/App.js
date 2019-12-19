import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import RoutesContainer from './Routes';
import { connect } from 'react-redux';
import { actions as cardActions } from './store/ducks/cards';

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
    </Router>
  );
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  error: state.error,
  cards: state.cards,
});

const mapDispatchToProps = {
  fetchCards: cardActions.cards.fetchCards.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
