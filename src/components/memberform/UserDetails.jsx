// UserDetails.jsx

import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class UserDetails extends Component {

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const { values } = this.props;
        return (
            <Form >
                <h3 className="ui centered">Hi there!  Please provide us with some details about you:</h3>
                <Form.Field>
                    <label>First Name</label>
                    <input
                        placeholder='First Name'
                        onChange={this.props.handleChange('firstName')}
                        defaultValue={values.firstName}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input
                        placeholder='Last Name'
                        onChange={this.props.handleChange('lastName')}
                        defaultValue={values.lastName}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Email Address</label>
                    <input
                        type='email'
                        placeholder='Email Address'
                        onChange={this.props.handleChange('email')}
                        defaultValue={values.email}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Units of Measure - distance</label>
                    <input
                        placeholder='Units of Measure - distance'
                        onChange={this.props.handleChange('uom_distance')}
                        defaultValue={values.uom_distance}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Units of Measure - weight</label>
                    <input
                        placeholder='Units of Measure - weight'
                        onChange={this.props.handleChange('uom_weight')}
                        defaultValue={values.uom_weight}
                    />
                </Form.Field>
                <Button onClick={this.saveAndContinue}>Save And Continue </Button>
            </Form>
        )
    }
}

export default UserDetails;