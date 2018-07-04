import React from 'react';
import './Score.css';

const Score = (props) => (
  <div className="Score">
    <span className="Score-firstPlayer">{props.playerOneScore}</span>:
    <span className="Score-secondPlayer">{props.playerTwoScore}</span>
  </div>
);

export default Score;