import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from '../Button';
import Input from '../TextInput';

const Header = ({ doSearchPokemon, history }) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input) {
      doSearchPokemon(input);
      history.push('/');
    } else console.log('Empty input');
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
          <Button onClick={handleSearch} name="btn">Pesquisar</Button>
        </div>
      </div>
      <hr />
    </>
  );
};

Header.propTypes = {
  doSearchPokemon: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(Header);
