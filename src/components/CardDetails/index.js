import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledUl = styled.ul`
  list-style: none;
  color: #e5e1e1;

  width: 70%;
  padding: 15px;
  margin: 0 auto;

`;

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

const CardDetails = ({ location: { state } }) => (
  <StyledUl>
    <StyledListItem>
      <div>
        <img src={state.card.imageUrl} alt={state.card.name} />
      </div>
      <StyledContent>
        <StyledHeader>
          <h3>
            {`${state.card.number}: `}
            {state.card.name}
            <span>{` ${state.card.supertype} - ${state.card.subtype}`}</span>
            <span>{`HP: ${state.card.hp}`}</span>
          </h3>
        </StyledHeader>

        <ul>
          <h4>Rules:</h4>
          {state.card.text?.map((text) => <li key={text}>{text}</li>)}
        </ul>

        <ul>
          <h4>Types:</h4>
          {state.card.types?.map((type) => <li key={type}>{type}</li>)}
        </ul>

        <ul>
          <h4>Attacks:</h4>
          {state.card.attacks?.map((attack) => (
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
          {state.card.weaknesses?.map((weak) => <li key={weak.type}>{`${weak.type} ${weak.value}`}</li>)}
        </ul>
      </StyledContent>
    </StyledListItem>
  </StyledUl>
);

CardDetails.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
};


export default CardDetails;
