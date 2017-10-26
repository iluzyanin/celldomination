import './CellList.css';
import React from 'react';
import update from 'immutability-helper';
import Cell from '../Cell/Cell';
import CellModel from '../../models/CellModel';
import classNames from 'classnames';

class CellList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            isContainerAnimated: false
        }
        this.toggleContainerAnimation = this.toggleContainerAnimation.bind(this);
        this.activateBorder = this.activateBorder.bind(this);
    }

    componentDidMount() {
        this.setState({ rows: this.buildRows(7) });
    }

    render() {
        return (
            <div>
                <label>
                    <input type="checkbox" checked={this.state.isContainerAnimated} onChange={this.toggleContainerAnimation} />
                    Enable animation
                </label>
                <div className={classNames('container', { 'container--animated': this.state.isContainerAnimated })}>
                    {this.state.rows.map((cells, rowIndex) =>
                        <div className="row" key={rowIndex}>{cells.map((cell, cellIndex) =>
                            <Cell key={cellIndex} onBorderClick={(borderIndex) => this.activateBorder(rowIndex, cellIndex, borderIndex)} {...cell} />)}</div>)}
                </div>
            </div >
        );
    }

    activateBorder(row, column, border) {
        this.setState(prevState => {
            let rows = prevState.rows;
            const currentCell = rows[row][column];
            let nextCell;
            let keepTurn = false;
            if (border === 0) {
                nextCell = rows[row - 1][column];
                if (currentCell.top === 2) {
                    return;
                }
                rows = update(rows, { [row]: { [column]: { top: { $set: 2 } } } });
                rows = update(rows, { [row - 1]: { [column]: { bottom: { $set: 2 } } } });
                if (currentCell.isActive) {
                    //currentCell.player = $scope.currentPlayer;
                    //$scope.score[$scope.currentPlayer] += 1;
                    keepTurn = true;
                }
                if (nextCell.isActive) {
                    //nextCell.player = $scope.currentPlayer;
                    //$scope.score[$scope.currentPlayer] += 1;
                    keepTurn = true;
                }
            }
            if (border === 1) {
                nextCell = rows[row][column + 1];
                if (currentCell.right === 2) {
                    return;
                }
                rows = update(rows, { [row]: { [column]: { right: { $set: 2 } } } });
                rows = update(rows, { [row]: { [column + 1]: { left: { $set: 2 } } } });
                if (currentCell.isActive) {
                    //currentCell.player = $scope.currentPlayer;
                    //$scope.score[$scope.currentPlayer] += 1;
                    keepTurn = true;
                }
                if (nextCell.isActive) {
                    //nextCell.player = $scope.currentPlayer;
                    //$scope.score[$scope.currentPlayer] += 1;
                    keepTurn = true;
                }
            }
            if (border === 2) {
                nextCell = rows[row + 1][column];
                if (currentCell.bottom === 2) {
                    return;
                }
                rows = update(rows, { [row]: { [column]: { bottom: { $set: 2 } } } });
                rows = update(rows, { [row + 1]: { [column]: { top: { $set: 2 } } } });
                if (currentCell.isActive) {
                    //currentCell.player = $scope.currentPlayer;
                    //$scope.score[$scope.currentPlayer] += 1;
                    keepTurn = true;
                }
                if (nextCell.isActive) {
                    //nextCell.player = $scope.currentPlayer;
                    //$scope.score[$scope.currentPlayer] += 1;
                    keepTurn = true;
                }
            }
            if (border === 3) {
                nextCell = rows[row][column - 1];
                if (currentCell.left === 2) {
                    return;
                }
                rows = update(rows, { [row]: { [column]: { left: { $set: 2 } } } });
                rows = update(rows, { [row]: { [column - 1]: { right: { $set: 2 } } } });
                if (currentCell.isActive) {
                    //currentCell.player = $scope.currentPlayer;
                    //$scope.score[$scope.currentPlayer] += 1;
                    keepTurn = true;
                }
                if (nextCell.isActive) {
                    //nextCell.player = $scope.currentPlayer;
                    //$scope.score[$scope.currentPlayer] += 1;
                    keepTurn = true;
                }
            }
            return { rows };
        });

        /*if (rows.some(function (row) {
            return row.some(function (cell) {
                return cell.top === 1 ||
                    cell.right === 1 ||
                    cell.bottom === 1 ||
                    cell.left === 1;
            });
        })) {
            if (!keepTurn) {
                $scope.currentPlayer = $scope.currentPlayer === 0 ? 1 : 0;
            }

            if ($scope.currentPlayer === 1) {
                $timeout(function () {
                    computerMove();
                }, 100);
            }
        } else {
            $scope.isGameOver = true;
        }*/
    }

    toggleContainerAnimation() {
        this.setState({ isContainerAnimated: !this.state.isContainerAnimated });
    }

    buildRows(halfSize) {
        var rows = [];
        for (var i = 0; i < halfSize * 2; i++) {
            var cells = [];
            for (var j = 0; j < halfSize * 2; j++) {
                if (i < halfSize) {
                    if (j < halfSize - i - 2 ||
                        j >= halfSize + i + 2) {
                        cells.push(new CellModel());
                        continue;
                    }
                    if (j === halfSize - i - 2) {
                        cells.push(new CellModel(0, 2, 2, 0));
                        continue;
                    }
                    if (j === halfSize - i - 1) {
                        cells.push(new CellModel(2, 1, 1, 2));
                        continue;
                    }
                    if (j === halfSize + i) {
                        cells.push(new CellModel(2, 2, 1, 1));
                        continue;
                    }
                    if (j === halfSize + i + 1) {
                        cells.push(new CellModel(0, 0, 2, 2));
                        continue;
                    }
                }
                if (i === halfSize) {
                    if (j === 0) {
                        cells.push(new CellModel(1, 1, 2, 2));
                        continue;
                    }
                    if (j === halfSize * 2 - 1) {
                        cells.push(new CellModel(1, 2, 2, 1));
                        continue;
                    }
                }
                if (i > halfSize) {
                    if (j < i - halfSize - 1 ||
                        j > 3 * halfSize - i) {
                        cells.push(new CellModel());
                        continue;
                    }
                    if (j === i - halfSize - 1) {
                        cells.push(new CellModel(2, 2, 0, 0));
                        continue;
                    }
                    if (j === i - halfSize) {
                        cells.push(new CellModel(1, 1, 2, 2));
                        continue;
                    }
                    if (j === 3 * halfSize - i - 1) {
                        cells.push(new CellModel(1, 2, 2, 1));
                        continue;
                    }
                    if (j === 3 * halfSize - i) {
                        cells.push(new CellModel(2, 0, 0, 2));
                        continue;
                    }
                }

                cells.push(new CellModel(1, 1, 1, 1));
            }

            rows.push(cells);
        }
        return rows;
    }
}

export default CellList;