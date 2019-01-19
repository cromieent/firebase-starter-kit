import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import Select from 'react-select';
import { activityLevel } from '../support/listOfValues';


export default class ExerciseDetails extends Component {



    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {

        return (
            <Form color='blue' >
                <h1 className="ui centered">What is your typical exercise during the day like?</h1>
                <Select
                    autoFocus={true}
                    onChange={this.props.handleSelectChange('activityLevel')}
                    options={activityLevel}
                />

                <Button onClick={this.back}>Back</Button>
                <Button onClick={this.saveAndContinue}>Save and Continue</Button>
            </Form>
        )
    }
};