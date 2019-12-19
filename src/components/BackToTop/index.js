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
  box-shadow: 4px 4px 8px 0px rgba(0,0,0,0.75);
  transition: all 0.3s ease;

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
  }
`;

const BackToTop = () => (
  <StyledLink href="#">
    <i className="arrowUp" />
  </StyledLink>
);

export default BackToTop;
