import React from 'react';
import Field from '../Field/Field';
import './Game.css';

class Game extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fieldSizeInput: 5,
      fieldSize: 5
    }

    this.reset = this.reset.bind(this);
    this.fieldSizeChange = this.fieldSizeChange.bind(this);
  }

  fieldSizeChange(event) {
    this.setState({fieldSizeInput: parseInt(event.target.value, 10)});
  }

  reset() {
    this.setState((prevState) => ({ fieldSize: prevState.fieldSizeInput }));
  }

  render() {
    return (
      <div>
        <div className="FieldSettings">
          Field size: <input className="FieldSizeInput" type="number" value={this.state.fieldSizeInput} onChange={this.fieldSizeChange} />
          <button className="ResetButton" onClick={this.reset}>Reset</button>
        </div>
        <Field size={this.state.fieldSize} />
      </div>
    );
  }
}

export default Game;