import React from 'react';
import { Card } from './Card';

export class MiddleContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    
  }

 

  render() {
    
    return (  
      <div className='middle-container'>
        <div className='score-container'></div>
          <div className='deck-container'>
            <div className='discard-deck'></div>
            <div className='full-deck'></div>
            

          </div>

        
        
       
          
      </div>
    );
  }
}

export default MiddleContainer;