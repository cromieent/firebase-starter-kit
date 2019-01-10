import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMembersThunk, watchMemberAddedEvent, watchMemberRemovedEvent } from './store';
import { addMemberToFirebase/*, removeMemberFromFirebase*/ } from './firebase';
import { Member } from './member';
import WizardForm from './wizard/WizardForm';

import './App.css';

const mapState = state => ({
  members: state
});

const mapDispatch = dispatch => {
  dispatch(getMembersThunk());
  watchMemberAddedEvent(dispatch);
  watchMemberRemovedEvent(dispatch);
  return {};
}

class App extends Component {

  render() {
    return (
      <div>
        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            const member = { firstname: e.target.firstname, lastname: e.target.lastname };
            addMemberToFirebase(member);
          }}>
            <input type="member" name="firstname" />
            <input type="member" name="lastname" />
            <input type="submit" name="add member" />
          </form>
        </div>
        <WizardForm memberList={this.props.members} />
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(App);