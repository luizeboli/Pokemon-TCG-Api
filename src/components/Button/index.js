import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  position: relative;
  padding: 1em 1.5em;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  font-size: 16px;
  margin: 1em 0.8em;

  color: white;

  &::after, &::before {
    content: "";
    display: block;
    position: absolute;
    width: 30%;
    height: 30%;
    border: 2px solid;
    transition: all 0.4s ease;
    border-radius: 4px;
  }

  &::after {
    bottom: 0;
    right: 0;
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: white;
    border-right-color: white;
  }

  &::before {
    top: 0;
    left: 0;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-top-color: white;
    border-left-color: white;
  }
  
  &:hover:after, &:hover:before {
    width: 100%;
    height: 100%;
  }
`;

const Button = ({
  color, children, name, type, onClick,
}) => (
  <StyledButton color={color} type={type} name={name} onClick={onClick}>{children}</StyledButton>
);

Button.defaultProps = {
  color: 'primary',
  children: 'Botão',
  type: 'button',
};

Button.propTypes = {
  color: PropTypes.string,
  children: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default Button;
