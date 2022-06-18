import React from 'react';
import DiscardButton from './DiscardButton';
import PlayingCard from './PlayingCard';

const Hand = ({setDiscard, currentHand}) => {

  const handleDiscardClick = (index) => {
    setDiscard(index);
  };

  return (  
    <div>
      <div className="felt-table-box">
        {currentHand.map((card, index) => {
          return (
            <div className="single-card" key={'d'+index + card.val}>
              <PlayingCard 
                key={index + card.val + card.suit} 
                suit={card.suit} 
                value={card.val} 
                bonus={card.bonus}/>
              <DiscardButton 
                key={'c' + index} 
                action={handleDiscardClick} 
                targetIndex={index}>
              </DiscardButton>
          </div>
          )
        })};
      </div>
    </div>
  );
};

export default Hand;