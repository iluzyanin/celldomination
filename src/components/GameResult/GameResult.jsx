import React from 'react';
import PropTypes from 'prop-types';
import './GameResult.css';

const GameResult = (props) => (
  <div className="GameResult">
    Game over! {props.playerOneScore > props.playerTwoScore ? 'You won :)' : 'Computer won :('}
  </div>
);

GameResult.propTypes = {
  playerOneScore: PropTypes.number.isRequired,
  playerTwoScore: PropTypes.number.isRequired
};

export default GameResult;