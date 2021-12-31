import React from 'react';

export class Scoring extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    //this.handleSelectClick = this.handleSelectClick.bind(this);
  }

  scoreTotalCountBySuit = (suit) => {
    let total;
    let cards = this.props.currentHand.filter((card) => { return card.suit === suit });

    total = cards.map(card => card.val).reduce((prev, next) => prev + next);

    return total
  }

  getSameNumbers = (hand) => {
    let valueCount = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }

    let suitTotal = {
      "🤖": 0, 
      "🤠": 0,
      "🤡": 0,
      "👾": 0
    }

    for (const [key, value] of Object.entries(object1)) {
      console.log(`${key}: ${value}`);
    }
  }

  getFinalScore = (hand) => {
    let valueCount = {1: 0 ,2: 0, 3: 0, 4: 0, 5: 0};
    let suitTotal = {"🤖": 0, "🤠": 0, "🤡": 0, "👾": 0};
    let highestValue = { "🤖": 0, "🤠": 0, "🤡": 0, "👾": 0};

// iterate through each card, keeping total of possible score values
    for (let i=0; i<hand.length; i++) {
      //setup for card variables
      let currentCard = hand[i];
      let val = currentCard.val;
      let suit = currentCard.suit;

      //Set counts for certain card values
      newValueCount = valueCount[val] + 1;
      valueCount[val] = newValueCount;

      //Set total for each suit
      newSuitTotal = suitTotal[suit] + val;
      suitTotal[suit] = newSuitTotal;

      //Determine highest value card for each suit;
      let currentTopValue = highestValue[suit];
      highestValue[suit] = currentTopValue > val ? currentTopValue : val;

      //Get total for the rainbow (highest value each suit, summed)
      let highestValues = Object.values(highestValue);
      let rainbowSum = highestValues.reduce((a,b) => a + b);

      const finalScores = {
        rainbow: rainbowSum,
        suitTotal: suitTotal,
        valueCount: valueCount
      };




    }
  }

  render() {
    
    return (  
      <div>
        Scores:
        <button onClick={() => console.log(this.props.currentHand)}>Log Current Hand</button>
      </div>
    );
  }
}

export default Scoring;