import React from 'react';

var classNames = require('classnames');

export class DiscardButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
    
  }

  

  handleClick = () => {
    console.log(this.props.targetIndex, 'clicked for byebye')
    let targeted = this.props.targetIndex;
    this.props.action(targeted);
  }

  setIsHovered = (isHovered) => {
      this.setState({
        isHovered: isHovered
      });
    
  }
  

  render() {
    

    var buttonClasses = classNames(
      'discard-select', 'disc-text', {
        'unhovered-discard': !this.state.isHovered,
        'hovered-discard': this.state.isHovered
      }
    )

    return (  
      
      <button 
        className={buttonClasses} 
        onClick={() => this.handleClick()}
        onMouseEnter={() => {this.setIsHovered(true)}}
        onMouseLeave={() => {this.setIsHovered(false)}}
        >
       Select Discard
      </button>
    );
  }
}

export default DiscardButton;