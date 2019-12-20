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
  background-color: rgba(0,0,0,0.85);
  z-index: 2;
  cursor: pointer;

  .pokeball {
    position: relative;
    top: -200px;
    width: 200px;
    height: 200px;
    background: #fff;
    border: 10px solid #000;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset -10px 10px 0 10px #ccc;
    animation: fall .25s ease-in-out forwards,
              shake 1.25s cubic-bezier(.36,.07,.19,.97) infinite;
  }
  .pokeball::before,
  .pokeball::after {
    content:"";
    position: absolute;
  }
  .pokeball::before {
    background: red;
    width: 100%;
    height: 50%;
  }
  .pokeball::after {
    top: calc(50% - 10px);
    width: 100%;
    height: 13px;
    background: #000;
  }
  .pokeball__button {
    position: absolute;
    top: calc(50% - 30px);
    left: calc(50% - 30px);
    width: 60px;
    height: 60px;
    background: #7f8c8d;
    border: 10px solid #fff;
    border-radius: 50%;
    z-index: 10;
    box-shadow: 0 0 0 10px black;
    animation: blink .5s alternate infinite;
  }
  
  @keyframes blink {
    from { background: #eee;}
    to { background: #e74c3c; }
  }
  @keyframes shake {
    0 { transform: translate(0, 0) rotate(0); }
    20% { transform: translate(-10px, 0) rotate(-20deg); }
    30% { transform: translate(10px, 0) rotate(20deg); }
    50% { transform: translate(-10px, 0) rotate(-10deg); }
    60% { transform: translate(10px, 0) rotate(10deg); }
    100% { transform: translate(0, 0) rotate(0); }
  }
  @keyframes fall {
    0% { top: -200px }
    60% { top: 0 }
    80% { top: -20px }
    100% { top: 0 }
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
      <div className="pokeball">
        <div className="pokeball__button" />
      </div>
    </StyledLoader>
  );
};

export default Loader;
