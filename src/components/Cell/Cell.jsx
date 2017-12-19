import './Cell.css';
import React from 'react';

const Cell = (props) => {
  const borderClassName = (border) => {
    let cssClass = border;
    if (props[border] === 2) {
      cssClass += ' active';
    }

    return cssClass;
  };

  const cellClassName = (props) => {
    let { top, right, bottom, left, player } = props;
    let cssClass = "box";
    if (top === 2 && right === 2 && bottom === 2 && left === 2) {
      cssClass += player === 0 ? ' isFirstPlayer' : ' isSecondPlayer';
    }

    return cssClass;
  }

  return (
    <div className={cellClassName(props)}>
      {props.top > 0 &&
        <div className={borderClassName('top')} onClick={() => props.onBorderClick(0)}></div>
      }
      {props.right > 0 &&
        <div className={borderClassName('right')} onClick={() => props.onBorderClick(1)}></div>
      }
      {props.bottom > 0 &&
        <div className={borderClassName('bottom')} onClick={() => props.onBorderClick(2)}></div>
      }
      {props.left > 0 &&
        <div className={borderClassName('left')} onClick={() => props.onBorderClick(3)}></div>
      }
    </div>
  );
}

export default Cell;