import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import RoutesContainer from './Routes';

import api from './api';

import './app.css';

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.get('/cards').then((response) => setCards(response.data.cards));
  }, []);

  const doSearchPokemon = (input) => {
    api.get(`/cards?name=${input}`).then((response) => setCards(response.data.cards));
  };

  return (
    <Router>
      <Header doSearchPokemon={doSearchPokemon} />
      <RoutesContainer cards={cards} />
    </Router>
  );
}

export default App;
