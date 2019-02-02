import React, { Component } from 'react';
import UserDetails from './UserDetails';
import MeasurementDetails from './MeasurementDetails';
import GeneralActivityDetails from './GeneralActivityDetails';
import DailyExercise from './DailyExercise';
import Confirmation from './Confirmation';
import Success from './Success';
import FacebookLogin from '../../components/auth/facebook';
import BTuser from '../firebase/BT_User';

class MainForm extends Component {

    initialState = {
        step: 99,
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

    constructor(props) {
        super(props)
        this.state = this.initialState;
    };

    reset() {
        this.setState(this.initialState);
    };

    setFacebookData = (fbData) => {
        const { accessToken,
            signedRequest,
            email,
            firstName,
            lastName,
            facebookId
        } = fbData;

        this.setState({
            step: 1,
            facebookId: facebookId,
            firstName,
            lastName,
            email,
            accessToken,
            signedRequest,
            isLoggedIn: true
        });
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

    handleSelectChange = input => event => {
        console.log('Setting ' + input + ' to ' + event.value);
        this.setState({ [input]: event.value })
    };

    handleChange = input => event => {
        this.setState({ [input]: event.target.value })
    };

    logoutFromFacebook = () => {
        window.FB.logout();
        this.setState({ isLoggedIn: false });
    }

    _renderRoute() {
        const { step } = this.state;
        const { firstName, lastName, email, age, city, country, exerciseType, firebaseId, isLoggedIn } = this.state;
        const values = { firstName, lastName, email, age, city, country, exerciseType, firebaseId, isLoggedIn };
        switch (step) {
            case 99: //Used for testing new components
                return <BTuser
                    values={values}
                />;
            case 1:
                if (isLoggedIn) {
                    return <UserDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                }
                break;
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
                return <h1>WELCOME TO THE BARITRACKER!</h1>
        }
    }

    render() {
        const { firstName, lastName, email, age, city, country, exerciseType, firebaseId, isLoggedIn } = this.state;
        const values = { firstName, lastName, email, age, city, country, exerciseType, firebaseId, isLoggedIn };
        return <div>
            <FacebookLogin
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                loadUserInfo={this.loadUserInfo}
                setFacebookData={this.setFacebookData}
                statusChangeCallback={this.statusChangeCallback}
                logoutFromFacebook={this.logoutFromFacebook}
                values={values}
                isLoggedIn={isLoggedIn} />
            {this._renderRoute()}
        </div>
    }
}

export default MainForm;