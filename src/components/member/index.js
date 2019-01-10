import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMembersThunk, watchMemberAddedEvent, watchMemberRemovedEvent } from '../store';


const mapState = state => ({
    members: state
});

const mapDispatch = dispatch => {
    dispatch(getMembersThunk());
    watchMemberAddedEvent(dispatch);
    watchMemberRemovedEvent(dispatch);
    return {};
}

export class Member extends Component {

    render() {
        const memberList = this.props.memberList.map(member => {
            if (member.data) {
                const { id } = member;
                const { firstname, lastname, created, updated } = member.data();
                return (
                    <div key={id}>
                        <div>{id}</div>
                        <div>{firstname} {lastname}</div>
                        <div>Created: {new Date(created.seconds).toString()}</div>
                        <div>Last Updated: {new Date(updated.seconds).toString()}</div>
                    </div>
                );
            }
            return <div key="noId">Nothing to see here</div>;
        });
        return (
            <div>{memberList}</div>
        );
    }
}

export default connect(mapState, mapDispatch)(Member);