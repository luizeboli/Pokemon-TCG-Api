import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledContainer = styled.div`

  width: 100%;
  height: 56px;
  border-radius: 4px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);
  transition: 0.2s background-color ease-in-out, 0.3s box-shadow ease-in-out;

  label {
    position: absolute;
    top: 24px;
    left: 16px;
    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 12px;
    font-weight: 600;
    line-height: 24px;
    color: #ffffff;
    opacity: 0;
    pointer-events: none;
    transition: 0.1s all ease-in-out;
  }

  &:focus-within, &.isActive {
    background-color: #ffffff;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.3);  

    input {
      padding: 24px 16px 8px 16px;
    }

    label {   
      top: 4px;
      opacity: 1;
      color: #512da8; 
    }
  }

  &:hover:not(:focus-within):not(.isActive) {
    background-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  }

`;

const StyledInput = styled.input`
  width: 100%;
  height: 56px;
  position: relative;
  padding: 0px 16px;
  border: none;
  border-radius: 4px;
  font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  background-color: transparent;
  color: #282828;
  outline: none;
  box-shadow: 0px 4px 20px 0px transparent;
  transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out,
    0.1s padding ease-in-out;
  -webkit-appearance: none;

  &:focus {
    padding: 24px 16px 8px 16px;
  }

  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const TextInput = ({
  labelText, name, placeholder, value, onChange,
}) => {
  const [active, setActive] = useState(false);

  return (
    <StyledContainer className={active || value ? 'isActive' : ''}>
      <label htmlFor={name}>{labelText}</label>
      <StyledInput
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}

        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />
    </StyledContainer>
  );
};

TextInput.defaultProps = {
  placeholder: '',
};

TextInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextInput;
