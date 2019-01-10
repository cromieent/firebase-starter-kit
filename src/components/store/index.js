import { createStore, applyMiddleware } from 'redux';
import db from '../firebase';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const db_members = db.collection("members");


/**
 * ACTION TYPES
 */

const GET_MEMBERS = 'get members';
const ADD_MEMBER = 'add member';
const REMOVE_MEMBER = 'remove member';
const FORMAT_MEMBER_LIST = 'format member list';

/**
 * ACTION CREATORS
 */

export const getMembers = (members) => ({ type: GET_MEMBERS, members });
export const addMember = (member) => ({ type: ADD_MEMBER, member });
export const removeMember = (member) => ({ type: REMOVE_MEMBER, member });
export const formatMemberList = (memberList) => ({ type: FORMAT_MEMBER_LIST, memberList });

/**
 * THUNKS
 */

export function getMembersThunk() {
    return dispatch => {
        const members = [];

        db_members.onSnapshot(snap => {
            const theDocs = snap.docs;
            theDocs.forEach(doc => {
                members.push(doc);
            });
            dispatch(getMembers(members))
        });
    };
};

/**
 * REDUCER
 */
function Reducer(state = [], action) {
    switch (action.type) {
        case GET_MEMBERS:
            return action.members;
        case ADD_MEMBER:
            return [...state, action.member];
        case REMOVE_MEMBER:
            return state.filter(member => member.id !== action.member.id);
        case FORMAT_MEMBER_LIST:
            return [...state, action.displayMe];
        default:
            return state;
    }
}

/**
 * LISTENERS
 */
export function watchMemberAddedEvent(dispatch) {
    db_members.onSnapshot((snap) => {
        const theMember = snap.docs;
        dispatch(addMember(theMember));
    });
};

export function watchMemberRemovedEvent(dispatch) {
    db_members.onSnapshot((snap) => {
        const theMember = snap.docs;
        dispatch(removeMember(theMember));
    });
};

export function watchMemberFormatEvent(dispatch) {
    db_members.onSnapshot((snap) => {
        const theMembers = snap.docs;
        dispatch(formatMemberList(theMembers));
    })
}


export default createStore(Reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));