import React from 'react';
import { Card } from './Card';

export class TopContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    
  }

 

  render() {
    
    return (  
      <div className='top-frame'>
        <div className='score-button-container'>
          <div className='score-button'>
         SCORE IT!
          </div>
        </div>
        <div className='buttons-top-left'>
        <div className='draw-two-button'>
            <div className='draw-two-text'>DRAW TWO</div>
          </div>
          <div className='shuffle-button'>
          <div className='shuffle-text'>SHUFFLE</div>
          </div>
          
        </div>
        
       
          
      </div>
    );
  }
}

export default TopContainer;