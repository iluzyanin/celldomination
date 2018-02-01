import './Cell.css';
import React from 'react';
import PropTypes from 'prop-types';

const Cell = (props) => {
  const borderClassName = (border) => {
    let cssClass = border;
    if (props[border] === 2) {
      cssClass += ' active';
    }

    return cssClass;
  };

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
    console.log(index)
  }

  return (
    <div className={cellClassName()} onClick={() => props.onClick()}>
      {props.top > 0 &&
        <div className={borderClassName('top')} onClick={handleClick.bind(null, 0)}></div>
      }
      {props.right > 0 &&
        <div className={borderClassName('right')} onClick={handleClick.bind(null, 1)}></div>
      }
      {props.bottom > 0 &&
        <div className={borderClassName('bottom')} onClick={handleClick.bind(null, 2)}></div>
      }
      {props.left > 0 &&
        <div className={borderClassName('left')} onClick={handleClick.bind(null, 3)}></div>
      }
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