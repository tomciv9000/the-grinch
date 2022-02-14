import React from 'react';

export class Scoring extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayScore: {}
    };
    //this.handleSelectClick = this.handleSelectClick.bind(this);
  }

  getLongestRun = (hand) => {
    /* Get an array of card values from a given hand */
    let arr = hand.map(card => card.val);

    /* We insert all the array elements into
    unordered set. */
    let valueSet = new Set();
    for (let i = 0; i < arr.length; i++) {
      valueSet.add(arr[i]);
    }

    // check each possible sequence from the start
    // then update optimal length
    let result = 0;
    for (let j = 0; j < arr.length; j++) {
      // if current element is the starting
        // element of a sequence
      if (!valueSet.has(arr[j] - 1)) {
            // Then check for next elements in the
            // sequence
            let k = arr[j];

            // increment the value of array element
            // and repeat search in the set
            while (valueSet.has(k))
                k++;
 
            // Update optimal length if this length
            // is more. To get the length as it is
            // incremented one by one
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
      rainbow: rainbowSum,
      suitTotal: highestSuit,
      valueCount: topValueMatch,
      bestRun: bestRun
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