import React, { Component } from 'react';
import UserDetails from './UserDetails';
import MeasurementDetails from './MeasurementDetails';
import GeneralActivityDetails from './GeneralActivityDetails';
import DailyExercise from './DailyExercise';
import Confirmation from './Confirmation';
import Success from './Success';
import FacebookLogin from '../../components/auth/facebook';
import { getMemberFromFirebase } from '../firebase';

class MainForm extends Component {

    constructor(props) {
        super(props)
        this.state = this.initialState;
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = () => {
            window.FB.init({
                appId: '315756568976813',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v3.0'
            });
            window.FB.getLoginStatus(response => {
                if (response.authResponse) {
                    this.statusChangeCallback(response);
                    this.loadUserInfo(response.authResponse.userID);
                }
            });
            window.FB.Event.subscribe('auth.statusChange', response => {
                if (response.authResponse) {
                    window.FB.getLoginStatus(response => {
                        this.statusChangeCallback(response);
                    })
                } else {
                    console.log('[FacebookLogin] User cancelled login or did not fully authorize.');
                    this.reset();
                }
            });
        };
    };

    initialState = {
        step: 1,
        facebookId: '',
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        city: '',
        country: '',
        activityLevel: '',
        firebaseId: '',
        isLoggedIn: false,
    };

    reset() {
        this.setState(this.initialState);
    }

    componentDidMount() {
    }

    statusChangeCallback(response) {
        if (response.status === 'connected') {
            this.setState({
                accessToken: response.authResponse,
                signedRequest: response.signedRequest,
                facebookId: response.userID,
                isLoggedIn: true,
                step: 1
            })
        } else if (response.status === 'not_authorized') {
            console.log("[FacebookLogin] Person is logged into Facebook but not your app");
        } else {
            console.log("[FacebookLogin] Person is not logged into Facebook");
        }
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        })
    };

    loadUserInfo(facebookId) {
        let getMemberPromise = new Promise((resolve, reject) => {
            resolve(getMemberFromFirebase(facebookId));
        });

        getMemberPromise.then(theMember => {
            if (theMember) {
                const { firstname, lastname, id, created, updated } = theMember;
                this.setState({
                    firstname,
                    lastname,
                    facebookId,
                    id,
                    created,
                    updated
                });
            }
        }).catch(error => {
            console.log(error);
        });
        return null;
    };

    handleSelectChange = input => event => {
        console.log('Setting ' + input + ' to ' + event.value);
        this.setState({ [input]: event.value })
    };

    handleChange = input => event => {
        this.setState({ [input]: event.target.value })
    };

    render() {
        const { step } = this.state;
        const { firstName, lastName, email, age, city, country, exerciseType, firebaseId, isLoggedIn } = this.state;
        const values = { firstName, lastName, email, age, city, country, exerciseType, firebaseId, isLoggedIn };
        switch (step) {
            case 99: //Used for testing new components
                return <DailyExercise
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    handleSelectChange={this.handleSelectChange}
                    values={values}
                />
            case 0:
                return <FacebookLogin
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    loadUserInfo={this.loadUserInfo}
                    statusChangeCallback={this.statusChangeCallback}
                    values={values}
                />
            case 1:
                if (isLoggedIn) {
                    return <UserDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                } else {
                    this.setState({
                        step: 0
                    });
                    return null;
                }
            case 2:
                return <MeasurementDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}
                />
            case 3:
                return <GeneralActivityDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    handleSelectChange={this.handleSelectChange}
                    values={values}
                />
            case 4:
                return <DailyExercise
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    handleSelectChange={this.handleSelectChange}
                    values={values}
                />
            case 5:
                return <Confirmation
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    values={values}
                />
            case 6:
                return <Success />
            default:
                return 'Nothing here';

        }
    }
}

export default MainForm;