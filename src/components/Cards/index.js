import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a {    
    margin: 15px;
    transition: all 0.3s ease;
  }

  a:hover {    
    transform: translateY(-10px);
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

export default Cards;
