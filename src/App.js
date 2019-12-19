import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import RoutesContainer from './Routes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCards, fetchCardByPokeName } from './redux/actions/fetchCards';

import './app.css';

function App({ cards, fetchCards, fetchCardByPokeName }) {
  useEffect(() => {
    fetchCards();
  }, []);

  const doSearchPokemon = (input) => {
    fetchCardByPokeName(input);
  };

  return (
    <Router>
      <Header doSearchPokemon={doSearchPokemon} />
      <RoutesContainer cards={cards} />
    </Router>
  );
}

const mapStateToProps = (state) => ({
  cards: state.cards,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchCards, fetchCardByPokeName }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
