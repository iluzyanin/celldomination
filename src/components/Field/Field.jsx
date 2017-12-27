import './Field.css';
import React from 'react';
import Cell from '../Cell/Cell';
import { buildRows, getCellNeighbours } from '../../models/FieldModel';
import computeMove from '../../services/computer';

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
      <div className='container'>
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
          this.computerMove();
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
    setTimeout(() => {
      const move = computeMove(this.state.rows);
      if (move) {
        this.activateBorder(move.row, move.column, move.border);
      }
    }, 100);
  }
}

export default Field;