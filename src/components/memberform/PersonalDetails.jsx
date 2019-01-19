import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class PersonalDetails extends Component {
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { values } = this.props;
        return (
            <Form color='blue' >
                <h2 className="ui centered">Hi there!  Please provide us with some details about you:</h2>
                <Form.Field>
                    <label>Age</label>
                    <input placeholder='Age'
                        onChange={this.props.handleChange('age')}
                        defaultValue={values.age}
                    />
                </Form.Field>
                <Form.Field>
                    <label>City</label>
                    <input placeholder='City'
                        onChange={this.props.handleChange('city')}
                        defaultValue={values.city}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Country</label>
                    <input placeholder='Country'
                        onChange={this.props.handleChange('country')}
                        defaultValue={values.country}
                    />
                </Form.Field>

                <Button onClick={this.back}>Back</Button>
                <Button onClick={this.saveAndContinue}>Save and Continue</Button>
            </Form>
        )
    }
}

export default PersonalDetails;