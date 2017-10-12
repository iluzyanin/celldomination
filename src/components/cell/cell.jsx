import React, { component } from 'react';
import './cell.css';

const Cell = (props) => {
    return (
        <div className="box">
            <div className="top active"></div>
            <div className="right active"></div>
            <div className="bottom active"></div>
            <div className="left active"></div>
        </div>
    );
}

export default Cell;