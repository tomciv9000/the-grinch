import React from 'react';

export const CardBonus = (props) => {
  if (props.bonus) {
    let bonusSuit = props.bonus.requirement;
    let bonusValue = props.bonus.value;
  
    return (
      <div className="card-bonus">
        <div className="bonus-suit">{bonusSuit}</div>
        <div className="bonus-value">+{bonusValue}</div>
      </div>
    );
  } else {
    return null;
  }
}