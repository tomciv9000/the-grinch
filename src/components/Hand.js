import React from 'react';
import {DiscardButton} from './DiscardButton';
import { PlayingCard } from './PlayingCard';

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
        
        
        <div className="felt-table-box">
          {this.props.currentHand.map((card, index) => {
            
            return (
              <div className="single-card" key={'d'+index + card.val}>
            <PlayingCard key={index + card.val + card.suit} suit={card.suit} value={card.val} bonus={card.bonus}/>
            <DiscardButton key={'c' + index} action={this.handleDiscardClick} targetIndex={index}></DiscardButton>
            {/* <button className="discard-select disc-text" onClick= {() => this.handleDiscardClick(index)}>Select Discard</button> */}
            </div>
            )
          })}
        </div>
          
      </div>
    );
  }
}

export default Hand;