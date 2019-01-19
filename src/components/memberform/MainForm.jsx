import React, { Component } from 'react';
import UserDetails from './UserDetails';
import MeasurementDetails from './MeasurementDetails';
import GeneralActivityDetails from './GeneralActivityDetails';
import DailyExercise from './DailyExercise';
import Confirmation from './Confirmation';
import Success from './Success';

class MainForm extends Component {
    state = {
        step: 99,
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        city: '',
        country: '',
        activityLevel: ''
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
    }

    handleSelectChange = input => event => {
        console.log('Setting ' + input + ' to ' + event.value);
        this.setState({ [input]: event.value })
    }

    handleChange = input => event => {
        this.setState({ [input]: event.target.value })
    }

    render() {
        const { step } = this.state;
        const { firstName, lastName, email, age, city, country, exerciseType } = this.state;
        const values = { firstName, lastName, email, age, city, country, exerciseType };
        switch (step) {
            case 99: //Used for testing new components
                return <DailyExercise
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    handleSelectChange={this.handleSelectChange}
                    values={values}
                />
            case 1:
                return <UserDetails
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    values={values}
                />
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