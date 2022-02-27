import React from 'react';
import { CardBonus } from './CardBonus';


export class PlayingCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasBonus: false
    };
    
  }

  getStyle = (suit) => {
    var suitStyles = {
      "🤖": "card card-robot",
      "👾": "card card-alien",
      "🤠": "card card-cowboy",
      "🤡": "card card-clown"
    };
  
    return suitStyles[suit];
  }

  buildCard = (cardData) => {
    const styleDiv = this.getStyle(cardData.suit);
    return (
      
      <div className={styleDiv} onClick={()=>{console.log(cardData.suit, cardData.value, 'clicked')}}>
        <div className="card-contents">
          <div className="card-value">{cardData.value}</div>
          <div className="card-suit">{cardData.suit}</div>
        </div>
          <CardBonus bonus={cardData.bonus}/>
      </div>
      
      );
  }
 

  render() {
   return (this.buildCard(this.props));

 
  }
}

export default PlayingCard;