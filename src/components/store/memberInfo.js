import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

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
const GET_SINGLE_MEMBER = 'get single member';

/**
 * ACTION CREATORS
 */

export const getSingleMember = (memberId, members) => ({ type: GET_SINGLE_MEMBER, memberInfo: { memberId, members } });
export const getMembers = (members) => ({ type: GET_MEMBERS, members });
export const addMember = (member) => ({ type: ADD_MEMBER, member });
export const removeMember = (member) => ({ type: REMOVE_MEMBER, member });

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
            const memberList = [];
            action.members.map((theMember) => {
                return memberList.push({
                    id: theMember.id,
                    firstname: theMember.firstname,
                    lastname: theMember.lastname,
                    updated: theMember.updated,
                    created: theMember.created,
                    surgeryType: theMember.surgeryType,
                    gender: theMember.gender
                });
            });
            return [...state, memberList];

        case GET_SINGLE_MEMBER:
            const { currentId, members } = action.memberInfo;
            return members.map((theMember) => {
                if (theMember.id === currentId) {
                    let saveMember = {
                        id: theMember.id,
                        firstname: theMember.firstname,
                        lastname: theMember.lastname,
                        updated: theMember.updated,
                        created: theMember.created,
                        surgeryType: theMember.surgeryType,
                        gender: theMember.gender
                    };
                    return [...state, { currentMember: saveMember }];
                };
                return [...state, { currentMember: null }];
            });

        case ADD_MEMBER:
            const theMember = action.member;
            let memberCreateData = {
                firstname: theMember.firstname,
                lastname: theMember.lastname,
                created: theMember.created,
                updated: theMember.updated,
                surgeryType: theMember.surgeryType,
                gender: theMember.gender
            };
            return [...state, memberCreateData];

        case REMOVE_MEMBER:
            return state.filter(member => member.id !== action.member.id);

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

const reducers = {
    Reducer,
    form: formReducer
};

const reducer = combineReducers(reducers);

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));