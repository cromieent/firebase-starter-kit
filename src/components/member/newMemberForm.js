import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMembersThunk, watchMemberAddedEvent, watchMemberRemovedEvent } from './store/memberInfo';
import { addMemberToFirebase/*, removeMemberFromFirebase*/ } from './firebase';
import WizardForm from './wizard';

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

class NewMemberForm extends Component {

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const member = {
                            id: e.target.id,
                            firstname: e.target.firstname,
                            lastname: e.target.lastname,
                            gender: e.target.gender,
                            surgeryType: e.target.gender,
                            created: e.target.created,
                            updated: e.target.updated
                        };
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

export default connect(mapState, mapDispatch)(NewMemberForm);