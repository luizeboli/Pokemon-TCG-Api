import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Button from '../Button';
import Input from '../TextInput';

const StyledContainer = styled.div`  
  .header-wrapper {
    padding: 15px;
    display: table;
    
    margin: 0 auto;
  }

  .search-wrapper {
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-wrapper {
    border-radius: 10px;
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: center;
    background-color: #fff;
  }
`;

const Header = ({ doSearchPokemon }) => {
  const [input, setInput] = useState('');
  const history = useHistory();

  const handleSearch = () => {
    if (input) {
      doSearchPokemon(input);
      history.push('/');
    } else console.log('Empty input');
  };

  return (
    <StyledContainer>
      <div className="header-wrapper">
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
            type="search"
            autoComplete="off"
          />
          <Button onClick={handleSearch} name="btn">Pesquisar</Button>
        </div>
      </div>
      <hr />
    </StyledContainer>
  );
};

Header.propTypes = {
  doSearchPokemon: PropTypes.func.isRequired,
};

export default Header;
