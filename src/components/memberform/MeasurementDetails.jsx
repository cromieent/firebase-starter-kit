import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class MeasurementDetails extends Component {
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
                <h1 className="ui centered">Enter your starting measurements</h1>
                <Form.Field>
                    <label>Neck Circumference</label>
                    <input placeholder='Neck Circumference'
                        onChange={this.props.handleChange('city')}
                        defaultValue={values.city}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Upper Arm Circumference</label>
                    <input placeholder='Upper Arm Circumference'
                        onChange={this.props.handleChange('arm_upper_in')}
                        defaultValue={values.arm_upper_in}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Forearm Circumference</label>
                    <input placeholder='Forearm Circumference'
                        onChange={this.props.handleChange('arm_forearm_in')}
                        defaultValue={values.arm_forearm_in}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Chest Circumference</label>
                    <input placeholder='Chest Circumference'
                        onChange={this.props.handleChange('chest_in')}
                        defaultValue={values.chest_in}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Bust</label>
                    <input placeholder='Bust'
                        onChange={this.props.handleChange('bust_in')}
                        defaultValue={values.bust_in}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Abdomen</label>
                    <input placeholder='Abdomen'
                        onChange={this.props.handleChange('belly_in')}
                        defaultValue={values.belly_in}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Waist</label>
                    <input placeholder='Waist'
                        onChange={this.props.handleChange('waist_in')}
                        defaultValue={values.waist_in}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Waist</label>
                    <input placeholder='Thigh'
                        onChange={this.props.handleChange('thigh_in')}
                        defaultValue={values.thigh_in}
                    />
                </Form.Field>
                <Button onClick={this.back}>Back</Button>
                <Button onClick={this.saveAndContinue}>Save and Continue</Button>
            </Form>
        )
    }
}

export default MeasurementDetails;