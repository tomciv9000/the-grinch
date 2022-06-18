import React, {useState, useEffect} from 'react';

var classNames = require('classnames');

const DiscardButton = ({targetIndex, action, canDiscard}) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  

  const handleClick = () => {
    let targeted = targetIndex;
    action(targeted);
  };

  useEffect(() => {
    setIsActive(canDiscard);
  }, [canDiscard]);

  var buttonClasses = classNames(
      'discard-select', 'disc-text', {
        'unhovered-discard': !isHovered,
        'hovered-discard': isHovered,
        'active-button': isActive,
        'inactive-button': !isActive
      }
  );

    return (  
      <button 
        className={buttonClasses}
        disabled={!isActive} 
        onClick={() => handleClick()}
        onMouseEnter={() => {setIsHovered(true)}}
        onMouseLeave={() => {setIsHovered(false)}}
        >
       Select Discard
      </button>
    );
  
}

export default DiscardButton;