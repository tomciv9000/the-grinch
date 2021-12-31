import React from 'react';
import Deck from './Deck';
import Hand from './Hand';
import Discard from './Discard';
import Scoring from './Scoring';

export class Game extends React.Component {

  constructor(props) {
    super(props);
    //this.buildDeck = this.buildDeck.bind(this);
    this.state = {
      currentDeck: this.buildDeck(),
      hand: [],
      discard: [],
      turn: 0
    };
  }

  buildDeck = () => {
    const suits = ["🤖", "🤠", "🤡", "👾"];
    const values = [1, 2, 3, 4, 5, 6];
    
    let cardDeck = [];
    let card;
    let bonusCard;

    for (let x=0; x<suits.length; x++) {
      for (let y=0; y<values.length; y++) {
        card = {
          suit: suits[x],
          val: values[y],
          bonus: false  
        };

        cardDeck.push(card);

        if (y <= 2) {
          let bonus = {};
          bonus.value = y < 2 ? 5 : 10
          bonus.count = y < 2 ? 1 : 3
          
          switch (card.suit) {
            case "🤖":
              if (card.val === 1) {
                bonus.requirement = "🤡";
              } else if (card.val === 2) {
                bonus.requirement = "👾";
              } else {
                bonus.requirement = "🤠🤠🤠";
              }
              break;
            case "🤠":
              if (card.val === 1) {
                bonus.requirement = "👾";
              } else if (card.val === 2) {
                bonus.requirement = "🤖";
              } else {
                bonus.requirement = "🤡🤡🤡";
              }
              break;
            case "🤡":
              if (card.val === 1) {
                bonus.requirement = "🤖";
              } else if (card.val === 2) {
                bonus.requirement = "🤠";
              } else {
                bonus.requirement = "👾👾👾";
              }
              break;
            case "👾":
              if (card.val === 1) {
                bonus.requirement = "🤠";
              } else if (card.val === 2) {
                bonus.requirement = "🤡";
              } else {
                bonus.requirement = "🤖🤖🤖";
              }
              break;
            default:
              break;
          }
          bonusCard = Object.assign({}, card);
          bonusCard.bonus = bonus;
          cardDeck.push(bonusCard)
        }
      }
    }
    return cardDeck;
  }

  shuffleCards = () => {
    let counter = this.state.currentDeck.length;
    let t;
    let i;

    let newShuffle = this.state.currentDeck.slice();

    while (counter) {
      i = Math.floor(Math.random() * counter --);
      t = newShuffle[counter];
      newShuffle[counter] = newShuffle[i];
      newShuffle[i] = t;
    }
    this.setState({currentDeck: newShuffle});
  }

  drawTwo = () => {
    let copyDeck = this.state.currentDeck.slice();
    let twoNewCards = copyDeck.splice(-2, 2);

    this.setHand(twoNewCards);
    this.setDeck(copyDeck);

  }

  setDeck = (newDeck) => {
    this.setState({
      currentDeck: newDeck
    });
  
  }

  setHand = (newCards) => {
    let newHand = [...this.state.hand, ...newCards];
  
    this.setState({
      hand: newHand
    });
    
  }

  setDiscard = (index) => {
    let selectIndex = index;
    let newHand = [...this.state.hand];
    let newDiscard = [...this.state.discard];
    let selectedCard = newHand.splice(selectIndex, 1)[0];
    let turnCount = this.state.turn + 1;
    console.log(turnCount)

    newDiscard.push(selectedCard);

    this.setState({
      discard: newDiscard,
      hand: newHand,
      turn: turnCount
    })
    
  }

  

  render() {
    return (  
      <div>
       <Deck currentDeck={this.state.currentDeck} shuffleCards={this.shuffleCards}/>
       <button onClick= {() => this.drawTwo()}>Draw Two</button>
       <Discard currentPile = {this.state.discard}/>
       <Hand drawTwo={this.drawTwo} discard={this.state.discard}currentHand={this.state.hand} setDiscard={this.setDiscard}/>
       <Scoring currentHand={this.state.hand}/>
      </div>
    );
  }
}

export default Game;