import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import RoutesContainer from './Routes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCards, fetchCardByPokeName } from './store/ducks/cards';

import './app.css';

function App({
  loading, cards, fetchCards, fetchCardByPokeName,
}) {
  useEffect(() => {
    fetchCards();
  }, []);

  const doSearchPokemon = (input) => {
    fetchCardByPokeName(input);
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchCards, fetchCardByPokeName }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
