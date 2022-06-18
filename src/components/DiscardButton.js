import React, {useState} from 'react';

var classNames = require('classnames');

const DiscardButton = (props) => {

  const [isHovered, setIsHovered] = useState(false);
  

  const handleClick = () => {
    let targeted = props.targetIndex;
    props.action(targeted);
  };

  
    
  var buttonClasses = classNames(
      'discard-select', 'disc-text', {
        'unhovered-discard': !isHovered,
        'hovered-discard': isHovered
      }
  );

    return (  
      <button 
        className={buttonClasses} 
        onClick={() => handleClick()}
        onMouseEnter={() => {setIsHovered(true)}}
        onMouseLeave={() => {setIsHovered(false)}}
        >
       Select Discard
      </button>
    );
  
}

export default DiscardButton;