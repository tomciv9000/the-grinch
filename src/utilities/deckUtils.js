export const buildDeck = () => {
  const suits = ["π€", "π€ ", "π€‘", "πΎ"];
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
          case "π€":
            if (card.val === 1) {
              bonus.requirement = "π€‘";
            } else if (card.val === 2) {
              bonus.requirement = "πΎ";
            } else {
              bonus.requirement = "π€ π€ π€ ";
            }
            break;
          case "π€ ":
            if (card.val === 1) {
              bonus.requirement = "πΎ";
            } else if (card.val === 2) {
              bonus.requirement = "π€";
            } else {
              bonus.requirement = "π€‘π€‘π€‘";
            }
            break;
          case "π€‘":
            if (card.val === 1) {
              bonus.requirement = "π€";
            } else if (card.val === 2) {
              bonus.requirement = "π€ ";
            } else {
              bonus.requirement = "πΎπΎπΎ";
            }
            break;
          case "πΎ":
            if (card.val === 1) {
              bonus.requirement = "π€ ";
            } else if (card.val === 2) {
              bonus.requirement = "π€‘";
            } else {
              bonus.requirement = "π€π€π€";
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
};

export const shuffleCards = (deck) => {
  let counter = deck.length;
  let t;
  let i;

  let newShuffle = deck.slice();
  while (counter) {
    i = Math.floor(Math.random() * counter --);
    t = newShuffle[counter];
    newShuffle[counter] = newShuffle[i];
    newShuffle[i] = t;
  }
  return newShuffle;
};

export const drawTwo = (deck) => {
  const twoNewCards = deck.splice(-2, 2);
  const drawObj = {
    newCards: twoNewCards,
    newDeck: deck
  };
  return drawObj;
};

export const getStyle = (suit) => {
  var suitStyles = {
    "π€": "card card-robot",
    "πΎ": "card card-alien",
    "π€ ": "card card-cowboy",
    "π€‘": "card card-clown"
  };

  return suitStyles[suit];
};


