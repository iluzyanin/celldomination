import React from 'react';
import Field from '../Field/Field';

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
    if (this.state.fieldSize === this.state.fieldSizeInput) {
      this.forceUpdate(); // TODO: Find a better way to reset a field with the same size
    }
    this.setState((prevState) => ({ fieldSize: prevState.fieldSizeInput }));
  }

  render() {
    return (
      <div>
        <button className="button" onClick={this.reset}>Reset</button>
        <input type="number" value={this.state.fieldSizeInput} onChange={this.fieldSizeChange} />
        <Field size={this.state.fieldSize} />
      </div>
    );
  }
}

export default Game;