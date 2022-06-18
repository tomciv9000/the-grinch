import React, {useState, useEffect} from 'react';

var classNames = require('classnames');

const Button = ({action, turnCount, label, canDraw}) => {

  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    getActiveStatus();
  });

  const handleClick = () => {
    if (isActive) {
      action();
    }
  };

  const getActiveStatus = () => {
    let turn = turnCount;
    let activeStatus;

    if (label === 'SHUFFLE') {
      activeStatus = turn === 0 ? true : false;
    } else if (label === 'DRAW TWO') {
      activeStatus = (turn > 0 && turn < 4 && canDraw()) ? true : false;
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
        onMouseEnter={() => {setIsHovered(true)}}
        onMouseLeave={() => {setIsHovered(false)}}
      >
       {label}
      </button>
    );

};

export default Button;