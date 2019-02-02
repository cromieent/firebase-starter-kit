import React, { Component } from 'react';
import { getMemberFromFirebase } from '../firebase';

export default class BT_User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            facebookId: '',
            fullName: '',
            lastName: '',
            firstName: '',
            UOM_Length: '',
            UOM_Weight: ''
        }

    };

    componentDidMount() {

        if (this.props) {
            let { facebookId } = this.props.values;
            facebookId = (facebookId === '') ? facebookId : '10157022730268035';
            let memberInfoPromise = new Promise((resolve, reject) => {
                resolve(getMemberFromFirebase(facebookId));
            });
            memberInfoPromise.then((memberInfo) => {
                console.log(memberInfo);
            }).catch((error) => {
                console.log(error);
            })
        };

    }

    render() {
        return <div>This is the user profile</div>
    }
}