import React from 'react';
import CardListItem from '../CardListItem';
import styled from 'styled-components';

const StyledUl = styled.ul`
  list-style: none;
  color: #e5e1e1;

  width: 70%;
  padding: 15px;
  margin: 0 auto;

`;

const CardList = ({ location: { state } }) => (
  <StyledUl>
    <CardListItem card={state.card} />
  </StyledUl>
);

export default CardList;
