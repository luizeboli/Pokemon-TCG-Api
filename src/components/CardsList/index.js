import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  a {    
    margin: 15px;
  }

  img { 
    transition: all 0.3s ease;
  }

  img:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.3);  
  }
`;


const Cards = ({ cards }) => (
  <StyledContainer>
    {cards.map((card) => (
      <Link
        key={card.id}
        to={{
          pathname: `/cards/${card.id}`,
          state: { card },
        }}
      >
        <img src={card.imageUrl} alt="pokemon" />
      </Link>
    ))}
  </StyledContainer>
);

Cards.propTypes = {
  cards: PropTypes.arrayOf(Object).isRequired,
};

export default Cards;
