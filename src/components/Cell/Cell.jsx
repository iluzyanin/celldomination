import React from 'react';
import PropTypes from 'prop-types';
import './cell.css';
import Border from '../border/border';

const Cell = (props) => {
  const cellClassName = () => {
    const { top, right, bottom, left, player } = props;
    let cssClass = "box";
    if (top === 2 && right === 2 && bottom === 2 && left === 2) {
      cssClass += player === 0 ? ' isFirstPlayer' : ' isSecondPlayer';
    }

    return cssClass;
  }

  const handleClick = (index, event) => {
    event.stopPropagation();
    props.onBorderClick(index);
  }

  return (
    <div className={cellClassName()} onClick={() => props.onClick()}>
      {['top', 'right', 'bottom', 'left'].map((borderName, index) => (
        props[borderName] > 0 &&
        <Border
          key={borderName}
          className={borderName}
          onClick={handleClick.bind(null, index)}
          isActive={props[borderName] === 2}>
        </Border>
      ))}
    </div>
  );
}

Cell.propTypes = {
  top: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  player: PropTypes.number,
  onBorderClick: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cell;