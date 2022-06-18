import React, {useState, useEffect} from 'react';

var classNames = require('classnames');

const Button = (props) => {

  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    getActiveStatus();
  });


  // componentDidUpdate(prevProps) {
  //   if (this.props.turnCount !== prevProps.turnCount) {
  //     this.getActiveStatus();
  //   }
  // }

  

  const handleClick = () => {
    if (isActive) {
      props.action();
      if (!props.keepActive) {
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
    let turn = props.turnCount;
    let activeStatus;

    if (props.label === 'SHUFFLE') {
      activeStatus = turn === 0 ? true : false;
    } else if (props.label === 'DRAW TWO') {
      activeStatus = (turn > 0 && turn < 4) ? true : false;
    } else if (props.label === 'SCORE IT') {
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
       {props.label}
      </button>
    );
  
};

export default Button;