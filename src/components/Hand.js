import React from 'react';
import { Card } from './Card';

export class Hand extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    //this.handleSelectClick = this.handleSelectClick.bind(this);
  }

  handleDiscardClick = (index) => {
    this.props.setDiscard(index);
  }

  render() {
    
    return (  
      <div>
        
        
        <div className="hand">
          {this.props.currentHand.map((card, index) => {
            
            return (
              <div key={'d'+index + card.val}>
            <Card key={index + card.val + card.suit} suit={card.suit} value={card.val} bonus={card.bonus}/>
            <button onClick= {() => this.handleDiscardClick(index)}>Get Rid of It</button>
            </div>
            )
          })}
        </div>
          
      </div>
    );
  }
}

export default Hand;