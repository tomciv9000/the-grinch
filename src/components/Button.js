import React from 'react';

var classNames = require('classnames');

export class Button extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      isHovered: false,
    };
    
  }

  handleClick = () => {
    this.props.action();
    if (!this.props.keepActive && this.state.isActive) {
      this.switchActiveStatus()
    }
  }

  setIsHovered = (isHovered) => {
    if (this.state.isActive) {
      this.setState({
        isHovered: isHovered
      });
    }
  }

  switchActiveStatus = () => {
    let newStatus = !this.state.isActive;
    
    this.setState({
      isActive: newStatus
    });
  }

  render() {
    var buttonClasses = classNames(
      'button', 'button-text', {
        'active-button': this.state.isActive,
        'inactive-button': !this.state.isActive,
        'hovered-button': this.state.isHovered
      }
    )

    return (  
      <button 
        className={buttonClasses} 
        onClick={() => this.handleClick()}
        onMouseEnter={() => {this.setIsHovered(true)}}
        onMouseLeave={() => {this.setIsHovered(false)}}
        >
       {this.props.label}
      </button>
    );
  }
}

export default Button;