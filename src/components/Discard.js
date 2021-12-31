import React from 'react';
import { Card } from './Card';

export class Discard extends React.Component {

  getTopCard = () => {
    let topCard;
    let newDiscard = this.props.currentPile;
    if (newDiscard.length > 0) {
      topCard = newDiscard[newDiscard.length - 1];
      return topCard;
    } else {
      return false;
    }
  }


  render() {
    var topCard = this.getTopCard();
    if (!!topCard) {
      return (
      <div className='discard'>
        <Card suit={topCard.suit} value={topCard.val} bonus={topCard.bonus}/>
      </div>)
      
    } else {
      return (
      null)
    }
  }
}

export default Discard;