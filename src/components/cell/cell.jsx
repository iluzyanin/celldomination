import './Cell.css';
import React from 'react';
import classNames from 'classnames';

const Cell = (props) => {
    const borderClassName = (border) => {
        let cssClass = border;
        if (props[border] === 2) {
            cssClass += ' active';
        }

        return cssClass;
    };

    return (
        <div className={classNames('box', { 'isFirstPlayer': props.isActive })}>
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