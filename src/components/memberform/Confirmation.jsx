import React, { Component } from 'react';
import { Button, List } from 'semantic-ui-react';

class Confirmation extends Component {
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { values: { firstName, lastName, email, exerciseType } } = this.props;

        return (
            <div>
                <h1 className="ui centered">Confirm your Details</h1>
                <p>Click Confirm if the following details have been correctly entered</p>
                <List>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>First Name: {firstName}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>Last Name: {lastName}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='mail' />
                        <List.Content>
                            <a href='mailto:scromie@barivangelist.com'>{email}</a>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            Exercise Type: {exerciseType}
                        </List.Content>
                    </List.Item>
                </List>
                <Button onClick={this.back}>Back</Button>
                {/*this is where we would save to the DB*/}
                <Button onClick={this.saveAndContinue}>Confirm</Button>
            </div>
        )
    }
}

export default Confirmation;