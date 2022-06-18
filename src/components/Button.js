import React, {useState, useEffect} from 'react';

var classNames = require('classnames');

const Button = ({action, keepActive, turnCount, label}) => {

  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    getActiveStatus();
  });

  const handleClick = () => {
    if (isActive) {
      action();
      if (!keepActive) {
        setIsActive(!isActive);
      }
    }
  };

  const setHovered = (isHovered) => {
    if (isActive) {
      setIsHovered(isHovered);
    }
  };

  const getActiveStatus = () => {
    let turn = turnCount;
    let activeStatus;

    if (label === 'SHUFFLE') {
      activeStatus = turn === 0 ? true : false;
    } else if (label === 'DRAW TWO') {
      activeStatus = (turn > 0 && turn < 4) ? true : false;
    } else if (label === 'SCORE IT') {
      activeStatus = turn === 4 ? true : false;
    }

   setIsActive(activeStatus);
  };
  
  const buttonClasses = classNames(
    'button', 'button-text', {
    'active-button': isActive,
    'inactive-button': !isActive,
    'hovered-button': isHovered
    }
  );

    return (  
      <button 
        className={buttonClasses} 
        onClick={() => handleClick()}
        onMouseEnter={() => {setHovered(true)}}
        onMouseLeave={() => {setHovered(false)}}
      >
       {label}
      </button>
    );

};

export default Button;