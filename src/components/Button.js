import React from 'react';

var classNames = require('classnames');

export class Button extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isHovered: false,
    };
    
  }

  componentDidMount() {
    this.getActiveStatus();
  }

  componentDidUpdate(prevProps) {
    if (this.props.turnCount !== prevProps.turnCount) {
      this.getActiveStatus();
    }
  }

  

  handleClick = () => {
    if (this.state.isActive) {
      this.props.action();
      if (!this.props.keepActive) {
        this.switchActiveStatus()
      }
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

  

  getActiveStatus = () => {
    let turn = this.props.turnCount;
    let activeStatus;

    if (this.props.label === 'SHUFFLE') {
      activeStatus = turn === 0 ? true : false;
    } else if (this.props.label === 'DRAW TWO') {
      
      activeStatus = (turn > 0 && turn < 4) ? true : false;
   } else if (this.props.label === 'SCORE IT') {
      activeStatus = turn === 4 ? true : false;
   }

   this.setState({
     isActive: activeStatus
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