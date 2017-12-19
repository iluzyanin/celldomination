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

  const cellClassName = () => {
    let { top, right, bottom, left, player } = props;
    let cssClass = "box";
    if (top === 2 && right === 2 && bottom === 2 && left === 2) {
      cssClass += player === 0 ? ' isFirstPlayer' : ' isSecondPlayer';
    }

    return cssClass;
  }

  const handleClick = function(event, index) {
    event.stopPropagation();
    props.onBorderClick(index);
  }

  return (
    <div className={cellClassName()} onClick={() => props.onClick()}>
      {props.top > 0 &&
        <div className={borderClassName('top')} onClick={(e) => handleClick(e, 0)}></div>
      }
      {props.right > 0 &&
        <div className={borderClassName('right')} onClick={(e) => handleClick(e, 1)}></div>
      }
      {props.bottom > 0 &&
        <div className={borderClassName('bottom')} onClick={(e) => handleClick(e, 2)}></div>
      }
      {props.left > 0 &&
        <div className={borderClassName('left')} onClick={(e) => handleClick(e, 3)}></div>
      }
    </div>
  );
}

export default Cell;