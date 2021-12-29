import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Deck extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  

  handleClick = () => {
    this.props.shuffleCards();
  }

  

  render() {
    

    return (  
      <div>
        <button onClick= {() => this.handleClick}>Shuffle</button>
        
        <div className="deck">
          <div className="card-back"></div>
          <div className="card-back"></div>
        </div>
        
      </div>
    );
  }
}

class Hand extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hand: [],
      discard: []
    };
  }

  handleDrawClick() {
    // if needed
  }

  handleDiscardClick() {
    // if needed
  }

  render() {
    return (  
      <div>
        <button onClick= {() => this.handleDrawClick()}>Draw Two</button>
        <button onClick= {() => this.handleDiscardClick()}>Discard</button>
        <div className="hand">
          {this.state.hand.map(function(card, index) {
            return <Card key={index} suit={card.suit} value={card.val} bonus={card.bonus} />
          })}
        </div>
      </div>
    );
  }
}



const Card = (props) => {
  if (props.suit === "🤖") {
    return (
    <div className="card card-blue">
      <div className="card-tl">
        <div className="card-value">{props.value}</div>
        <div className="card-suit">{props.suit}</div>
      </div>
        <CardBonus bonus={props.bonus}/>
    </div>);
  } else if (props.suit === "👾") {
    return (
      <div className="card card-red">
        <div className="card-tl">
          <div className="card-value">{props.value}</div>
          <div className="card-suit">{props.suit}</div>
        </div>
          <CardBonus bonus={props.bonus}/>
      </div>);
  } else if (props.suit === "🤠") {
    return (
      <div className="card card-orange">
        <div className="card-tl">
          <div className="card-value">{props.value}</div>
          <div className="card-suit">{props.suit}</div>
        </div>
          <CardBonus bonus={props.bonus}/>
      </div>);
  }
    else {
    return (
    <div className="card card-green">
      <div className="card-tl">
        <div className="card-value">{props.value}</div>
        <div className="card-suit">{props.suit}</div>
      </div>
      <CardBonus bonus={props.bonus}/>
    </div>);
  }
};

const CardBonus = (props) => {
  if (props.bonus) {
    let bonusSuit = props.bonus.requirement;
    let bonusValue = props.bonus.value;
  
    return (
      <div className="card-br">
        <div className="bonus-suit">{bonusSuit}</div>
        <div className="bonus-value">+{bonusValue}</div>
      </div>
    );
  } else {
    return null;
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.buildDeck = this.buildDeck.bind(this);
    this.shuffleCards = this.shuffleCards.bind(this);
    this.state = {
      currentDeck: this.buildDeck(),
      discard: [],
      turn: 0
    };
  }

  buildDeck() {
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

  shuffleCards() {
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

  handleDrawClick() {
    // if needed
  }

  handleDiscardClick() {
    // if needed
  }

  render() {
    return (  
      <div>
       <Deck currentDeck={this.state.currentDeck} shuffleCards={this.shuffleCards}/>
       <Hand />
      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
