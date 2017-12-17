import './Field.css';
import React from 'react';
import update from 'immutability-helper';
import Cell from '../Cell/Cell';
import buildRows from '../../models/FieldModel';
import classNames from 'classnames';

class Field extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rows: buildRows(5),
      fieldSize: 5,
      player: 0,
      playerOneScore: 0,
      playerTwoScore: 0,
      isGameOver: false
    }
    this.activateBorder = this.activateBorder.bind(this);
    this.reset = this.reset.bind(this);
    this.fieldSizeChange = this.fieldSizeChange.bind(this);
  }

  /*componentDidMount() {
    this.setState({ rows: buildRows(5) });
  }*/

  render() {
    return (
      <div className={classNames('container', { 'container--animated': this.state.isContainerAnimated })}>
        <button className="button" onClick={this.reset}>Reset</button>
        <input type="number" value={this.state.fieldSize} onChange={this.fieldSizeChange} />
        {this.state.rows.map((cells, rowIndex) =>
          <div className="row" key={rowIndex}>
            {cells.map((cell, cellIndex) =>
              <Cell key={cellIndex} onBorderClick={(borderIndex) => this.activateBorder(rowIndex, cellIndex, borderIndex)} {...cell} />)}
          </div>)}
        <p>Current player: {this.state.player}</p>
        <p>Player one score: {this.state.playerOneScore}</p>
        <p>Player two score: {this.state.playerTwoScore}</p>
        {this.state.isGameOver && 
        <p>Game over! {this.state.playerOneScore > this.state.playerTwoScore ? 'You won :)' : 'Computer won :('}</p>
        }
      </div>
    );
  }

  activateBorder(row, column, border) {
    this.setState(prevState => {
      let rows = prevState.rows;
      const currentCell = rows[row][column];
      let keepTurn = false;
      let scoreIncrement = 0;
      if (border === 0) {
        if (currentCell.top === 2) {
          return;
        }
        rows = update(rows, { [row]: { [column]: { top: { $set: 2 } } } });
        rows = update(rows, { [row - 1]: { [column]: { bottom: { $set: 2 } } } });
        if (rows[row][column].isActive) {
          rows = update(rows, { [row]: { [column]: { player: { $set: prevState.player } } } });
          keepTurn = true;
          scoreIncrement++;
        }
        if (rows[row - 1][column].isActive) {
          rows = update(rows, { [row - 1]: { [column]: { player: { $set: prevState.player } } } });
          keepTurn = true;
          scoreIncrement++;
        }
      }
      if (border === 1) {
        if (currentCell.right === 2) {
          return;
        }
        rows = update(rows, { [row]: { [column]: { right: { $set: 2 } } } });
        rows = update(rows, { [row]: { [column + 1]: { left: { $set: 2 } } } });
        if (rows[row][column].isActive) {
          rows = update(rows, { [row]: { [column]: { player: { $set: prevState.player } } } });
          keepTurn = true;
          scoreIncrement++;
        }
        if (rows[row][column + 1].isActive) {
          rows = update(rows, { [row]: { [column + 1]: { player: { $set: prevState.player } } } });
          keepTurn = true;
          scoreIncrement++;
        }
      }
      if (border === 2) {
        if (currentCell.bottom === 2) {
          return;
        }
        rows = update(rows, { [row]: { [column]: { bottom: { $set: 2 } } } });
        rows = update(rows, { [row + 1]: { [column]: { top: { $set: 2 } } } });
        if (rows[row][column].isActive) {
          rows = update(rows, { [row]: { [column]: { player: { $set: prevState.player } } } });
          keepTurn = true;
          scoreIncrement++;
        }
        if (rows[row + 1][column].isActive) {
          rows = update(rows, { [row + 1]: { [column]: { player: { $set: prevState.player } } } });
          keepTurn = true;
          scoreIncrement++;
        }
      }
      if (border === 3) {
        if (currentCell.left === 2) {
          return;
        }
        rows = update(rows, { [row]: { [column]: { left: { $set: 2 } } } });
        rows = update(rows, { [row]: { [column - 1]: { right: { $set: 2 } } } });
        if (rows[row][column].isActive) {
          rows = update(rows, { [row]: { [column]: { player: { $set: prevState.player } } } });
          keepTurn = true;
          scoreIncrement++;
        }
        if (rows[row][column - 1].isActive) {
          rows = update(rows, { [row]: { [column - 1]: { player: { $set: prevState.player } } } });
          keepTurn = true;
          scoreIncrement++;
        }
      }

      let playerOneScore = keepTurn && prevState.player === 0 ? prevState.playerOneScore + scoreIncrement : prevState.playerOneScore;
      let playerTwoScore = keepTurn && prevState.player === 1 ? prevState.playerTwoScore + scoreIncrement : prevState.playerTwoScore;
      let player = keepTurn ? prevState.player : prevState.player === 0 ? 1 : 0;

      let areMovesExist = rows.some(cells => cells.some(cell => cell.hasMove));
      let isGameOver = prevState.isGameOver;
      if (areMovesExist) {
        if (player === 1) {
          setTimeout(() => {
            this.computerMove();
          }, 100);
        }
      } else {
        isGameOver = true;
      }

      return { rows, player, playerOneScore, playerTwoScore, isGameOver };
    });
  }

  computerMove() {
    const availableMoves = [];
    const size = this.state.rows.length;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const cell = this.state.rows[i][j];
        if (cell.player !== undefined) {
          continue;
        }
        const openBorders = cell.getOpenBorders();

        if (openBorders.length === 1) {
          this.activateBorder(i, j, openBorders[0]);
          return;
        }
        if (openBorders.length === 0) {
          continue;
        }
        for (let k = 0; k < openBorders.length; k++) {
          const isLowPriority = openBorders.length === 2 ||
            (i > 0 && openBorders[k] === 0 && this.state.rows[i - 1][j].getOpenBorders().length === 2) ||
            (j < size - 1 && openBorders[k] === 1 && this.state.rows[i][j + 1].getOpenBorders().length === 2) ||
            (i < size - 1 && openBorders[k] === 2 && this.state.rows[i + 1][j].getOpenBorders().length === 2) ||
            (j > 0 && openBorders[k] === 3 && this.state.rows[i][j - 1].getOpenBorders().length === 2);
          availableMoves.push({
            row: i,
            column: j,
            border: openBorders[k],
            isLowPriority: isLowPriority
          });
        }
      }
    }

    if (availableMoves.length === 0) {
      return;
    }
    var goodMoves = availableMoves.filter(function (cell) {
      return !cell.isLowPriority;
    });
    console.log(goodMoves.length, availableMoves.length)

    if (goodMoves.length > 0) {
      const randomMove = goodMoves[Math.floor(Math.random() * (goodMoves.length))];
      this.activateBorder(randomMove.row, randomMove.column, randomMove.border);
      return;
    }
    const randomMove = availableMoves[Math.floor(Math.random() * (availableMoves.length))];
    this.activateBorder(randomMove.row, randomMove.column, randomMove.border);
  }

  fieldSizeChange(event) {
    this.setState({fieldSize: parseInt(event.target.value, 10)});
  }

  reset() {
    this.setState(prevState => ({
      rows: buildRows(prevState.fieldSize),
      player: 0,
      playerOneScore: 0,
      playerTwoScore: 0,
      isGameOver: false
    }));
  }
}

export default Field;