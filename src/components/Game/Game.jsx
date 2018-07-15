import React from 'react';
import {
  Button,
  ButtonGroup,
  Glyphicon
} from 'react-bootstrap';
import Field from '../field/field';
import Score from '../score/score';
import GameResult from '../game-result/game-result';
import { buildRows, getCellNeighbours } from '../../models/field-model';
import computeMove from '../../services/computer';
import './game.css';

class Game extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = this.constructCleanState(3);

    this.reset = this.reset.bind(this);
    this.enlargeField = this.enlargeField.bind(this);
    this.shrinkField = this.shrinkField.bind(this);
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

  enlargeField() {
    this.fieldSizeChange(1);
  }

  shrinkField() {
    this.fieldSizeChange(-1);
  }

  fieldSizeChange(increment) {
    const fieldSize = this.state.fieldSize + increment;
    if (fieldSize < 2 || fieldSize > 10) {
      return;
    }
    this.setState((prevState) => this.constructCleanState(prevState.fieldSize + increment));
  }

  reset() {
    this.setState((prevState) => this.constructCleanState(prevState.fieldSize));
  }

  handleBorderClick(row, column, border) {
    this.setState(prevState => {
      const rows = [...prevState.rows];
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
      const nextCellBorderName = neighbours[(border + 2) % 4].borderName;
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
        <div className="FieldSettings">
          <span className="FieldSettings-Size">Field size:</span>
          <ButtonGroup>
            <Button onClick={this.enlargeField}><Glyphicon glyph="plus" /></Button>
            <Button onClick={this.shrinkField}><Glyphicon glyph="minus" /></Button>
          </ButtonGroup>
          <Button bsStyle="primary" className="ResetButton" onClick={this.reset}>Reset</Button>
        </div>
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