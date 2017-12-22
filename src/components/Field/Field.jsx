import './Field.css';
import React from 'react';
import Cell from '../Cell/Cell';
import { buildRows, getCellNeighbours } from '../../models/FieldModel';
import classNames from 'classnames';

class Field extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rows: buildRows(props.size),
      player: 0,
      playerOneScore: 0,
      playerTwoScore: 0,
      isGameOver: false
    }
    this.activateBorder = this.activateBorder.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.size !== this.props.size) {
      this.setState({
        rows: buildRows(nextProps.size),
        player: 0,
        playerOneScore: 0,
        playerTwoScore: 0,
        isGameOver: false
      });
    }
  }

  render() {
    return (
      <div className={classNames('container', { 'container--animated': this.state.isContainerAnimated })}>
        {this.state.rows.map((cells, rowIndex) =>
          <div className="row" key={rowIndex}>
            {
              cells.map((cell, cellIndex) =>
              <Cell
                key={cellIndex}
                onBorderClick={(borderIndex) => this.activateBorder(rowIndex, cellIndex, borderIndex)}
                onClick={() => this.onCellClick(rowIndex, cellIndex)}
                {...cell} />)
              }
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
      const rows = prevState.rows.slice().map(r => r.slice());
      const neighbours = getCellNeighbours(row, column);
      const neighbour = neighbours[border];
      const currentCell = rows[row][column];
      let nextCell;
      let keepTurn = false;
      let scoreIncrement = 0;

      if (currentCell[neighbour.borderName] === 2) {
        return;
      }
      nextCell = rows[neighbour.nextRow][neighbour.nextColumn]; 
      currentCell[neighbour.borderName] = 2;
      const nextCellBorderName = neighbours[border > 1 ? border - 2 : border + 2].borderName;
      nextCell[nextCellBorderName] = 2;
      if (currentCell.isActive) {
        currentCell.player = prevState.player;
        keepTurn = true;
        scoreIncrement++;
      }
      if (nextCell.isActive) {
        nextCell.player = prevState.player;
        keepTurn = true;
        scoreIncrement++;
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
          });
        }
      } else {
        isGameOver = true;
      }

      return { rows, player, playerOneScore, playerTwoScore, isGameOver };
    });
  }

  onCellClick(row, column) {
    const currentCell = this.state.rows[row][column];
    const openBorders = currentCell.getOpenBorders();
    if (openBorders.length !== 1) {
      return;
    }

    this.activateBorder(row, column, openBorders[0]);
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

    if (goodMoves.length > 0) {
      const randomMove = goodMoves[Math.floor(Math.random() * (goodMoves.length))];
      this.activateBorder(randomMove.row, randomMove.column, randomMove.border);
      return;
    }
    const randomMove = availableMoves[Math.floor(Math.random() * (availableMoves.length))];
    this.activateBorder(randomMove.row, randomMove.column, randomMove.border);
  }
}

export default Field;