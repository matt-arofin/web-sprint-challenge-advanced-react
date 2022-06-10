import React from 'react';
import axios from 'axios';


// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

// const initialState = {
//   message: initialMessage,
//   email: initialEmail,
//   index: initialIndex,
//   steps: initialSteps,
// };

// const coordinatesArr = [
// [1,1], [2,1], [3,1], 
// [1,2], [2,2], [3,2],
// [1,3], [2,3], [3,3]
// ]; /* - initialIndex = array[4] */

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor(){
    super();
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
    };
  }
  
  coordinatesArr = [
    [1,1], [2,1], [3,1], 
    [1,2], [2,2], [3,2],
    [1,3], [2,3], [3,3]
  ];

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    console.log('current index of B: ', `(${this.coordinatesArr[this.state.index][0]}, ${this.coordinatesArr[this.state.index][1]})`)
    return this.coordinatesArr[this.state.index];
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates: ${this.coordinatesArr[this.state.index][0]}, ${this.coordinatesArr[this.state.index][1]}`
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
    });
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly. this.setState()
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    // axios.post(http://localhost:9000/api/result, { "x": 1, "y": 2, "steps": 3, "email": "lady@gaga.com" })
    // post data format: {`"x": ${this.coordinatesArr[this.state.index][0]}, "y": ${this.coordinatesArr[this.state.index][1]}, "steps": ${this.steps}, "email": ${this.email}`}
  }

  render() {
    const { className } = this.props;
    console.log(this.getXY())
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {`${this.state.steps}`} times</h3>
        </div>
        <div id="grid">
          {
            [0,1,2,3,4,5,6,7,8].map((idx) => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
