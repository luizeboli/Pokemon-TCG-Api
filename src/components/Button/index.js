import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
  color: #fff;
  text-decoration: none;
  background: #2196F3;
  padding: 20px;
  border-radius: 50px;
  display: inline-block;
  border: none;
  outline: none;
  transition: all 0.4s ease 0s;
  font-size: 16px;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  line-spacing: 2px;
  margin: 1em 0 1em 0.8em;

  &:hover {
    text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.4s ease 0s;
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
