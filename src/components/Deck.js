import React from 'react';
export class Deck extends React.Component {

  handleClick = () => {
    this.props.shuffleCards();
  }

  

  render() {
    

    return (  
      <div>
        <button onClick= {() => this.handleClick()}>Shuffle</button>
        
        <div className="deck">
          <div className="card-back"></div>
        </div>
        
      </div>
    );
  }
}

export default Deck;