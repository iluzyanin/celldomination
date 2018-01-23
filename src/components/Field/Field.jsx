import './Field.css';
import React from 'react';
import Cell from '../Cell/Cell';

class Field extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleOnBorderClick = this.handleOnBorderClick.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
  }

  render() {
    return (
      <div className='container'>
        {this.props.rows.map((cells, rowIndex) =>
          <div className="row" key={rowIndex}>
            {
              cells.map((cell, cellIndex) =>
                <Cell
                  key={cellIndex}
                  onBorderClick={(borderIndex) => this.props.onBorderClick(rowIndex, cellIndex, borderIndex)}
                  onClick={() => this.onCellClick(rowIndex, cellIndex)}
                  {...cell} />)
            }
          </div>)}
      </div>
    );
  }

  handleOnBorderClick(borderIndex) {
    //this.props.onBorderClick(rowIndex, cellIndex, borderIndex);
  }

  onCellClick(row, column) {
    const currentCell = this.props.rows[row][column];
    const openBorders = currentCell.getOpenBorders();
    if (openBorders.length !== 1) {
      return;
    }

    this.props.onBorderClick(row, column, openBorders[0]);
  }
}

export default Field;