import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  position: fixed;
  bottom: 20px;
  right: 30px;
  background-color: #ffb01f;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  transition: all 0.3s ease;
  box-shadow: 2px 2px 10px 0px rgba(0,0,0,0.50);

  i {
    border: solid black;
    border-width: 0 4px 4px 0;
    display: inline-block;
    padding: 3px;
  }

  .arrowUp {
    position: absolute;
    top: 20px;
    left: 14px;
    transform: rotate(-135deg);
    height: 20px;
    width: 20px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 3px 3px 10px 0px rgba(0,0,0,0.75);
  }
`;

const BackToTop = () => (
  <StyledLink href="#">
    <i className="arrowUp" />
  </StyledLink>
);

export default BackToTop;
