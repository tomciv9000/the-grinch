import React from 'react';
import { CardBonus } from './CardBonus';
import { getStyle } from '../utilities/deckUtils';


const PlayingCard = ({suit, value, bonus}) => {
  const styleDiv = getStyle(suit);

  return (
    <div className={styleDiv}>
        <div className="card-contents">
          <div className="card-value">{value}</div>
          <div className="card-suit">{suit}</div>
        </div>
          <CardBonus bonus={bonus}/>
      </div>
  );
};

export default PlayingCard;