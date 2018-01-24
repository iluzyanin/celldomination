import React from 'react';
import './Score.css';

class Score extends React.PureComponent {
  render() {
    return (
      <div className="Score">
        <span className="Score-firstPlayer">{this.props.playerOneScore}</span>:
        <span className="Score-secondPlayer">{this.props.playerTwoScore}</span>
      </div>
    );
  }
}

export default Score;