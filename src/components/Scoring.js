import React from 'react';

export class Scoring extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getLongestRun = (hand) => {
    let arr = hand.map(card => card.val);
    let valueSet = new Set();
    
    for (let i = 0; i < arr.length; i++) {
      valueSet.add(arr[i]);
    }

    let result = 0;

    for (let j = 0; j < arr.length; j++) {
      if (!valueSet.has(arr[j] - 1)) {
            let k = arr[j];
            while (valueSet.has(k))
                k++;
            result = Math.max(result, k - arr[j]);
      }
    }
    return result;
  }


  getFinalScore = (hand) => {
    let valueCount = {1: 0 ,2: 0, 3: 0, 4: 0, 5: 0, 6: 0};
    let suitTotal = {"🤖": 0, "🤠": 0, "🤡": 0, "👾": 0};
    let highestValue = { "🤖": 0, "🤠": 0, "🤡": 0, "👾": 0};

    // iterate through each card, keeping total of possible score values
    for (let i=0; i<hand.length; i++) {
      //setup for card variables
      let currentCard = hand[i];
      let val = currentCard.val;
      let suit = currentCard.suit;
      let newValueCount, newSuitTotal;

      //Set counts for certain card values
      newValueCount = valueCount[val] + 1;
      valueCount[val] = newValueCount;

      //Set total for each suit
      newSuitTotal = suitTotal[suit] + val;
      suitTotal[suit] = newSuitTotal;

      //Determine highest value card for each suit;
      let currentTopValue = highestValue[suit];
      highestValue[suit] = currentTopValue > val ? currentTopValue : val;

    }
    //Get total for the rainbow (highest value each suit, summed)
    let highestValues = Object.values(highestValue);
    let rainbowSum = highestValues.reduce((a,b) => a + b);
    let bestRun = this.getLongestRun(hand);
    let highestSuit = this.getWinningValue(suitTotal);
    let topValueMatch = this.getWinningValue(valueCount);

    const finalScores = {
      'Rainbow': rainbowSum,
      suitTotal: highestSuit,
      valueCount: topValueMatch,
      'Best Run': bestRun
    };

    const scoreDisplay = this.getDisplayObject(finalScores);

    console.log(finalScores);
    console.log(scoreDisplay)
    this.props.setFinalScore(scoreDisplay);
    


  }


  getWinningValue = (valuesObject = {}) => {
     let topKey = Object.keys(valuesObject).reduce((a, b) => valuesObject[a] > valuesObject[b] ? a : b);
     return {[topKey]: valuesObject[topKey]};
  }

  getDisplayObject = (finalScores) => {
    const displayState = (({ suitTotal, valueCount, ...others }) => others)(finalScores)
    
    let topSuiteKey = 'Highest Suite Total ' + Object.keys(finalScores.suitTotal)[0];
    let topSuiteValue = Object.values(finalScores.suitTotal)[0];

    let topMatchedKey = 'Most Matched ' + Object.keys(finalScores.valueCount)[0];
    let topMatchedValue = Object.values(finalScores.valueCount)[0];
     
    displayState[topSuiteKey] = topSuiteValue;
    displayState[topMatchedKey] = topMatchedValue;

    return displayState;
  }

  renderFinalScore = (scoreObject) => {
    Object.entries(scoreObject).map((category, index) => {
      return (<tr key={index}>
        <td>{category[0]}: </td>
        <td>{category[1]}</td>
      </tr>)
      
    })
  }

  render() {
    if (this.props.isScored) {
      console.log(this.props.finalScore)
      return (  

      <div>
        Scores:
        <table>
        <thead>
          <tr>
            <th>Final Score</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(this.props.finalScore).map((category, index) => {
          return (
          <tr key={index}>
            <td>{category[0]}: </td>
            <td>{category[1]}</td>
          </tr>) 
    })}
    </tbody>
      </table>
      </div>
    );
    } else {
      return (
        <div>
          <p>Game In Progress...</p>
          <button onClick={() => this.getFinalScore(this.props.currentHand)}>Get Final Score</button>
        </div>
      )
    }
    
  }
}

export default Scoring;