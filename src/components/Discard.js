import React from 'react';

import PlayingCard from './PlayingCard';
const Discard = (props) => {

  const getTopCard = () => {
    let topCard;
    let newDiscard = props.currentPile;
    if (newDiscard.length > 0) {
      topCard = newDiscard[newDiscard.length - 1];
      return topCard;
    } else {
      return false;
    }
  };

  var topCard = getTopCard();
  
  if (!!topCard) {
    return (
    <div className='discard'>
      <PlayingCard suit={topCard.suit} value={topCard.val} bonus={topCard.bonus}/>
    </div>)
  } else {
    return (null)
  }
  
};

export default Discard;