import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMembersThunk, watchMemberAddedEvent, watchMemberRemovedEvent } from './store/memberInfo';
import MainForm from './memberform/MainForm';
import { Container } from 'semantic-ui-react';
import LoginForm from './loginForm';
import MemberInfoForm from './member';
import * as LOV from './support/listOfValues';

import './App.css';

const mapState = state => ({
  state,
  showApp: false,
  showWizard: true,
  LOV
});

const mapDispatch = dispatch => {
  dispatch(getMembersThunk());
  watchMemberAddedEvent(dispatch);
  watchMemberRemovedEvent(dispatch);
  return {};
}

const displayMainApp = (shouldIBeShown) => {
  if (shouldIBeShown) {
    return (
      <div>First, let's get some information from you.  Please enter your Barivangelist credentials:
          <LoginForm />
      </div>
    )
  } else {
    return <div></div>
  }
}

const displayWizard = shouldIBeShown => {
  if (shouldIBeShown) {
    return (
      <MemberInfoForm />
    )
  } else {
    return <div>There is no member form yet.</div>
  }
}

class App extends Component {

  render() {
/*    if (this.props.showApp) {
      return <div>{displayMainApp(true)}</div>;
    }
    if (this.props.showWizard) {
      return <div>{displayWizard(true)}</div>;
    }
*/    return (
      <Container textAlign='center'>
        <MainForm />
      </Container>
    );
  }
}

export default connect(mapState, mapDispatch)(App);