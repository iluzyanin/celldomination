import './Cell.css';
import React from 'react';

class Cell extends React.PureComponent {
  borderClassName = (border) => {
    let cssClass = border;
    if (this.props[border] === 2) {
      cssClass += ' active';
    }

    return cssClass;
  };

  cellClassName = () => {
    let { top, right, bottom, left, player } = this.props;
    let cssClass = "box";
    if (top === 2 && right === 2 && bottom === 2 && left === 2) {
      cssClass += player === 0 ? ' isFirstPlayer' : ' isSecondPlayer';
    }

    return cssClass;
  }

  handleClick = (index, event) => {
    event.stopPropagation();
    this.props.onBorderClick(index);
  }

  render() {
    return (
      <div className={this.cellClassName()} onClick={() => this.props.onClick()}>
        {this.props.top > 0 &&
          <div className={this.borderClassName('top')} onClick={this.handleClick.bind(this, 0)}></div>
        }
        {this.props.right > 0 &&
          <div className={this.borderClassName('right')} onClick={this.handleClick.bind(this, 1)}></div>
        }
        {this.props.bottom > 0 &&
          <div className={this.borderClassName('bottom')} onClick={this.handleClick.bind(this, 2)}></div>
        }
        {this.props.left > 0 &&
          <div className={this.borderClassName('left')} onClick={this.handleClick.bind(this, 3)}></div>
        }
      </div>
    )};
}

export default Cell;