import React from 'react';
import { CardBonus } from './CardBonus';



const getStyle = (suit) => {
  var suitStyles = {
    "🤖": "card card-blue",
    "👾": "card card-red",
    "🤠": "card card-orange",
    "🤡": "card card-green"
  };

  return suitStyles[suit];
}

const buildCard = (cardData) => {
  const styleDiv = getStyle(cardData.suit);
  return (
    
    <div className={styleDiv} onClick={()=>{console.log(cardData.suit, cardData.value, 'clicked')}}>
      <div className="card-tl">
        <div className="card-value">{cardData.value}</div>
        <div className="card-suit">{cardData.suit}</div>
      </div>
        <CardBonus bonus={cardData.bonus}/>
    </div>
    
    );
}

export const Card = (props) => {
  return (buildCard(props));
  
};