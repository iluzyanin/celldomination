import './Cell.css';
import React from 'react';
import classNames from 'classnames';

const Cell = (props) => {
    return (
        <div className="box">
            {props.top > 0 &&
                <div className={classNames('top', { 'active': props.top === 2 })}></div>
            }
            {props.right > 0 &&
                <div className={classNames('right', { 'active': props.right === 2 })}></div>
            }
            {props.bottom > 0 &&
                <div className={classNames('bottom', { 'active': props.bottom === 2 })}></div>
            }
            {props.left > 0 &&
                <div className={classNames('left', { 'active': props.left === 2 })}></div>
            }
        </div>
    );
}

export default Cell;