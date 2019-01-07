import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTasksThunk, watchTaskAddedEvent, watchTaskRemovedEvent } from './store';
import { addTaskToFirebase, removeTaskFromFirebase } from './firebase';

import './App.css';

const mapState = state => ({
  tasks: state
});
const mapDispatch = dispatch => {
  dispatch(getTasksThunk());
  watchTaskAddedEvent(dispatch);
  watchTaskRemovedEvent(dispatch);
  return {};
}

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            addTaskToFirebase(e.target.task.value)
          }}>
            <input type="text" name="task" />
            <input type="submit" name="add task" />
          </form>
        </div>
        <div>
          <h2> Todo: </h2>
          <ul>
            {this.props.tasks.map(item => <li key={item.id}>{item.task}<button onClick={() => removeTaskFromFirebase(item.id)}>x</button></li>)}
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(App);