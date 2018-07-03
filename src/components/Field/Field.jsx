import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell/Cell';
import './Field.css';

const Field = (props) => {
  const onCellClick = (row, column) => {
    const currentCell = props.rows[row][column];
    const openBorders = currentCell.getOpenBorders();
    if (openBorders.length !== 1) {
      return;
    }

    props.onBorderClick(row, column, openBorders[0]);
  }

  return (
    <div className='container'>
      {props.rows.map((cells, rowIndex) =>
        <div className="row" key={rowIndex}>
          {
            cells.map((cell, cellIndex) =>
              <Cell
                key={cellIndex}
                onBorderClick={(borderIndex) => props.onBorderClick(rowIndex, cellIndex, borderIndex)}
                onClick={() => onCellClick(rowIndex, cellIndex)}
                {...cell} />)
          }
        </div>)}
    </div>
  );
}

Field.propTypes = {
  rows: PropTypes.array.isRequired,
  onBorderClick: PropTypes.func.isRequired
};

export default Field;