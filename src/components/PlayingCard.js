import React from 'react';
import { CardBonus } from './CardBonus';
import { getStyle } from './deckUtils';


const PlayingCard = (props) => {
  const styleDiv = getStyle(props.suit);

  return (
    <div className={styleDiv}>
        <div className="card-contents">
          <div className="card-value">{props.value}</div>
          <div className="card-suit">{props.suit}</div>
        </div>
          <CardBonus bonus={props.bonus}/>
      </div>
  );
};

export default PlayingCard;