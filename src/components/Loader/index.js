import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledLoader = styled.div`
  position: fixed;
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%; 
  height: 100%; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.8);
  z-index: 2;
  cursor: pointer;

  h2 {
    color: white;
  }

  .pokeball {
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 50% ;
  overflow: hidden;
  border: 3px solid;
  animation: frames .8s  linear 0s infinite;
  }

  .pokeball:after {
  content: '';
  position: absolute;
  width: 100px;
  height: 50px;
  background-color: red;
  border-bottom: 4px solid;
  top: -4px
  }

  .pokeball:before {
  content: '';
  position: absolute;
  background-color: #fff;
  width: 10px;
  height:10px;
  border: 4px solid;
  border-radius: 50%;
  bottom: 37px;
  right: 37px;
  z-index: 1;
  }

  @keyframes frames {
  0% {
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
  }
`;

const Loader = () => {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';

    // eslint-disable-next-line no-return-assign
    return () => document.documentElement.style.overflow = 'auto';
  }, []);
  document.documentElement.style.overflow = 'hidden';
  return (
    <StyledLoader>
      <div className="pokeball" />
      <h2>Loading...</h2>
    </StyledLoader>
  );
};

export default Loader;
