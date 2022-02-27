import React from 'react';
import TopContainer from './TopContainer';
import Deck from './Deck';
import Hand from './Hand';
import Discard from './Discard';
import Scoring from './Scoring';
import MiddleContainer from './MiddleContainer';
import BottomContainer from './BottomContainer';
import Button from './Button';
import FeltTable from './FeltTable';
import PlayingCard from './PlayingCard';

export class Game extends React.Component {

  constructor(props) {
    super(props);
    //this.buildDeck = this.buildDeck.bind(this);
    this.state = {
      currentDeck: this.buildDeck(),
      hand: [],
      discard: [],
      turn: 0,
      isScored: false,
      finalScore: {}
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
    let turnCount = this.state.turn + 1;
    while (counter) {
      i = Math.floor(Math.random() * counter --);
      t = newShuffle[counter];
      newShuffle[counter] = newShuffle[i];
      newShuffle[i] = t;
    }
    this.setState(
      {
        currentDeck: newShuffle,
        turn: turnCount
      });

    console.log(newShuffle)
  }

  

  drawTwo = () => {
    console.log('draw two')
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

  setFinalScore = (displayScore = {}) => {
    this.setState({
      finalScore: displayScore,
      isScored: true
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
      <div className='game-container'>
        <div className='top-container'>
          <div className='left-buttons'>
            <Button label='SHUFFLE' action={this.shuffleCards} keepActive={false} turnCount={this.state.turn}/>
            <Button label='DRAW TWO' action={this.drawTwo} keepActive={true} turnCount={this.state.turn}/>
          </div>
          <div className='spacer'></div>
          <div className='right-buttons'>
            <Button label='SCORE IT' action={this.drawTwo} keepActive={false} turnCount={this.state.turn}/>
          </div>
        </div>
       <div className='deck-discard'>
       <Deck />
      <Discard currentPile = {this.state.discard}/>
       </div>
       

<Hand discard={this.state.discard}currentHand={this.state.hand} setDiscard={this.setDiscard}/>

<Scoring 
        currentHand={this.state.hand} 
        isScored={this.state.isScored}
        setFinalScore={this.setFinalScore} 
        finalScore={this.state.finalScore}/>
       {/* <Deck currentDeck={this.state.currentDeck} shuffleCards={this.shuffleCards}/>
       <button onClick= {() => this.drawTwo()}>Draw Two</button>
       <Discard currentPile = {this.state.discard}/>
       
       <Scoring 
        currentHand={this.state.hand} 
        isScored={this.state.isScored}
        setFinalScore={this.setFinalScore} 
        finalScore={this.state.finalScore}/> */}
      </div>
    );
  }
}

export default Game;