import React, {useState} from 'react';
import axios from 'axios';
import * as yup from 'yup';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialState = {message: initialMessage, email: initialEmail, steps: initialSteps, index: initialIndex, success:null}

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const coordinatesArr = [
    [1,1], [2,1], [3,1], 
    [1,2], [2,2], [3,2],
    [1,3], [2,3], [3,3]
  ];

  const [state, setState] = useState(initialState);
  console.log(state)

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    // console.log(coordinatesArr[state.index])
    return coordinatesArr[state.index];
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    // console.log(getXY())
    return `(${getXY()[0]}, ${getXY()[1]})`
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setState({...initialState, message: initialMessage, email: initialEmail, success:null});
    document.getElementById('email').value = ''
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    // Should not allow you to endlessly sidescroll (ie moving from the right edge to the left continuously clicking right)
    if(direction === 'up' && state.index - 3 >= 0){
      return {...state, index:state.index-3, steps:state.steps+1, success:null};
    } else if(direction === 'down' && state.index + 3 <= 8){
      return {...state, index:state.index+3, steps:state.steps+1, success:null};
    } else if(direction === 'left' && state.index - 1 >= 0 && state.index != 3 && state.index != 6){
      return {...state, index:state.index-1, steps:state.steps+1, success:null};
    } else if(direction === 'right' && state.index + 1 <= 8 && state.index != 2 && state.index != 5){
      return {...state, index:state.index+1, steps:state.steps+1, success:null};
    } else {return {...state, success:`You can't go ${direction}`}}
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    console.log(evt.target.id)
    setState(getNextIndex(evt.target.id))
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    // console.log(evt.target.value)
    setState({...state, email:evt.target.value})
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    const x = getXY()[0];
    const y = getXY()[1];
    const steps = state.steps;
    const email = state.email;
    // const emailInput = document.getElementById('email')
    evt.preventDefault();
    // console.log({"x": x, "y": y, "steps": steps, "email": email})
    axios.post(`http://localhost:9000/api/result`, {"x": x, "y": y, "steps": steps, "email": email.trim()})
      .then(res => {return setState({...state, success:res.data.message})})
      .catch(err => {return setState({...state, success:err.response.data.message})})
      .finally(document.getElementById('email').value = '')
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXYMessage()}</h3>
        <h3 id="steps">You moved {state.steps} {state.steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === state.index ? ' active' : ''}`}>
              {idx === state.index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{state.success}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email" onChange={onChange}></input>
        <input id="submit" type="submit" onClick={onSubmit}></input>
      </form>
    </div>
  )
}
