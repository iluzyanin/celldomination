import './CellList.css';
import React from 'react';
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
                            <Cell key={cellIndex} {...cell} />)}</div>)}
                </div>
            </div >
        );
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