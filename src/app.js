import React, { Component } from 'react';
import './app.css';
import Game from './components/game/game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Cell Domination</h2>
        </div>
        <div className="App-intro">
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
