import React, { useEffect, useState } from 'react';

import api from './api';
import mock from './api/mock.json';

import Button from './components/Button';
import Input from './components/TextInput';

import RoutesContainer from './Routes';

import './app.css';

function App() {
  const [input, setInput] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.get('/cards').then((response) => setCards(response.data.cards));
  }, []);

  const doSearchPokemon = () => {
    api.get(`/cards?name=${input}`).then((response) => setCards(response.data.cards));
  };
  return (
    <>
      <div className="App">
        <div className="image-wrapper">
          <img src="https://pokemontcg.io/static/media/pokemon-minimalist.30bc8a16.pngg" alt="logo" />
        </div>

        <div className="search-wrapper">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            labelText="Digite o nome do Pokemón"
            name="txtPokemon"
            placeholder="Digite o nome do Pokemón"
          />
          <Button onClick={doSearchPokemon} name="btn">Pesquisar</Button>
        </div>
      </div>
      <hr />

      <RoutesContainer cards={cards} />
    </>
  );
}

export default App;
