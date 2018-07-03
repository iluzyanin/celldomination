import React from 'react';
import { Button, Form, ControlLabel, FormControl } from 'react-bootstrap';
import Field from '../Field/Field';
import Score from '../Score/Score';
import GameResult from '../GameResult/GameResult';
import { buildRows, getCellNeighbours } from '../../models/FieldModel';
import computeMove from '../../services/computer';
import './Game.css';

class Game extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = this.constructCleanState(5);

    this.reset = this.reset.bind(this);
    this.fieldSizeChange = this.fieldSizeChange.bind(this);
    this.handleBorderClick = this.handleBorderClick.bind(this);
  }

  constructCleanState(fieldSize) {
    return {
      fieldSize: fieldSize,
      rows: buildRows(fieldSize),
      player: 0,
      playerOneScore: 0,
      playerTwoScore: 0,
      isGameOver: false
    }
  }

  fieldSizeChange(event) {
    this.setState(this.constructCleanState(parseInt(event.target.value, 10)));
  }

  reset() {
    this.setState((prevState) => this.constructCleanState(prevState.fieldSize));
  }

  handleBorderClick(row, column, border) {
    this.setState(prevState => {
      const rows = prevState.rows.slice().map(r => r.slice().map(c => c.clone()));
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

      let playerOneScore = prevState.playerOneScore;
      let playerTwoScore = prevState.playerTwoScore;

      playerOneScore += keepTurn && prevState.player === 0 ? scoreIncrement : 0;
      playerTwoScore += keepTurn && prevState.player === 1 ? scoreIncrement : 0;

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

  computerMove() {
    setTimeout(() => {
      const move = computeMove(this.state.rows);
      if (move) {
        this.handleBorderClick(move.row, move.column, move.border);
      }
    }, 100);
  }

  render() {
    const playerOneScore = this.state.playerOneScore;
    const playerTwoScore = this.state.playerTwoScore;
    return (
      <div>
        <Form inline className="FieldSettings">
          <ControlLabel>Field size:</ControlLabel> <FormControl bsSize="small" type="number" value={this.state.fieldSize} onChange={this.fieldSizeChange} />
          <Button bsStyle="primary" className="ResetButton" onClick={this.reset}>Reset</Button>
        </Form>
        <Score playerOneScore={playerOneScore} playerTwoScore={playerTwoScore} />
        <Field rows={this.state.rows} onBorderClick={this.handleBorderClick} />
        {this.state.isGameOver &&
          <GameResult playerOneScore={playerOneScore} playerTwoScore={playerTwoScore}></GameResult>
        }
      </div>
    );
  }
}

export default Game;