import React, {useState} from 'react';
import Deck from './Deck';
import Hand from './Hand';
import Discard from './Discard';
import Score from './Score';
import Button from './Button';
import * as scoringUtils from './scoreUtils';
import * as deckUtils from './deckUtils';

const Game = (props) => {

  const [currentDeck, setCurrentDeck] = useState(deckUtils.buildDeck());
  const [hand, setHand] = useState([]);
  const [discard, setDiscard] = useState([]);
  const [turn, setTurn] = useState(0);
  const [isScored, setIsScored] = useState(false);
  const [finalScore, setFinalScore] = useState({});


  const handleShuffle = () => {
    const shuffledCards = deckUtils.shuffleCards(currentDeck);
    setCurrentDeck(shuffledCards);
    setTurn(turn + 1);
  };

  const handleDrawTwo = () => {
    const drawCards = deckUtils.drawTwo(currentDeck);
    setHand([...hand, ...drawCards.newCards]);
    setCurrentDeck(drawCards.newDeck);
  };

  const handleDiscard = (index) => {
    let selectIndex = index;
    let newHand = [...hand];
    let newDiscard = [...discard];
    let selectedCard = newHand.splice(selectIndex, 1)[0];
    let turnCount = turn + 1;

    newDiscard.push(selectedCard);
    setDiscard(newDiscard);
    setHand(newHand);
    setTurn(turnCount);
  };

  const handleScoreIt = () => {
    const finalScore = scoringUtils.getFinalScore(hand);
    const scoreDisplay = scoringUtils.getDisplayObject(finalScore);

    setFinalScore(scoreDisplay);
    setIsScored(true);
  };

  return (  
    <div className='game-container'>
      <div className='top-container'>
        <div className='left-buttons'>
          <Button label='SHUFFLE' action={handleShuffle} keepActive={false} turnCount={turn}/>
          <Button label='DRAW TWO' action={handleDrawTwo} keepActive={true} turnCount={turn}/>
        </div>
        <div className='spacer'/>
        <div className='right-buttons'>
          <Button label='SCORE IT' action={handleScoreIt} keepActive={false} turnCount={turn}/>
        </div>
      </div>
    <div className='deck-discard'>
      <Deck/>
      <Discard currentPile = {discard}/>
    </div>
    <Hand discard={discard} currentHand={hand} setDiscard={handleDiscard}/>
    <Score isScored={isScored} finalScore={finalScore}></Score>
  </div>
  );
  
};

export default Game;