import React, { Component } from 'react';
import './App.css';
import CellList from './components/CellList/CellList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Cell Domination</h2>
        </div>
        <div className="App-intro">
          <CellList />
        </div>
      </div>
    );
  }
}

export default App;
