import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;

  span { 
    margin: 0 15px;
  }
  h3, h4 {
    margin-bottom: 10px;
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;

  ul, li {
    list-style-type: none;
    margin:10px;
  }
`;

const StyledListItem = styled.li`
  display:flex;
`;


const CardListItem = ({ card }) => (
  <StyledListItem>
    <div>
      <img src={card.imageUrl} alt={card.name} />
    </div>
    <StyledContent>
      <StyledHeader>
        <h3>
          {`${card.number}: `}
          {card.name}
          <span>{` ${card.supertype} - ${card.subtype}`}</span>
          <span>{`HP: ${card.hp}`}</span>
        </h3>
      </StyledHeader>

      <ul>
        <h4>Rules:</h4>
        {card.text?.map((text) => <li key={text}>{text}</li>)}
      </ul>

      <ul>
        <h4>Types:</h4>
        {card.types?.map((type) => <li key={type}>{type}</li>)}
      </ul>

      <ul>
        <h4>Attacks:</h4>
        {card.attacks?.map((attack) => (
          <li key={attack.name}>
            {attack.name}
            <ul>
              <li>
                {attack.text}
              </li>
            </ul>
          </li>
        ))}
      </ul>

      <ul>
        <h4>Weakness:</h4>
        {card.weaknesses?.map((weak) => <li key={weak.type}>{`${weak.type} ${weak.value}`}</li>)}
      </ul>
    </StyledContent>
  </StyledListItem>
);

CardListItem.propTypes = {
  card: PropTypes.objectOf(Object).isRequired,
};

export default CardListItem;
