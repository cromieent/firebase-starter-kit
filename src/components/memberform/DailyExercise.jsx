import React, { Component } from 'react';
import { Form, Button, Table } from 'semantic-ui-react';
import Select from 'react-select';
import { MET_Values } from '../support/MET';
import { BMR, KCalPerMinute } from '../support/metabolicFormulas';
import uuid from 'uuid/v4';

const initialState = {
    MET_Values,   //MET object - Category{[{name:value},{name:value}]}
    value: '',
    met_category: '',
    met_activity: '',
    met_activity_name: '',
    met_value: 0.0,
    bmr: 0,
    minutes_spent: 0,
    kcal_burned_per_minute: 0,
    total_kcal_burned: 0,
    current_mass: 209,
    current_mass_units: 'lbs',
    current_height: 67,
    current_height_units: 'in',
    activityRecord: []
};

export default class DailyExercise extends Component {

    reset = (e) => {
        e.preventDefault();
        this.setState({
            MET_Values,   //MET object - Category{[{name:value},{name:value}]}
            value: '',
            met_category: '',
            met_activity: '',
            met_activity_name: '',
            met_value: '0.0',
            bmr: '',
            minutes_spent: '',
            kcal_burned_per_minute: '',
            total_kcal_burned: 0,
            current_mass: '209',
            current_mass_units: 'lbs',
            current_height: '67',
            current_height_units: 'in',
            activityRecord: []
        });
    }

    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
        this.handleSelectActivity = this.handleSelectActivity.bind(this);
        this.handleChangeMinutes = this.handleChangeMinutes.bind(this);
        this.getKCalPerMinute = this.getKCalPerMinute.bind(this);
        this.TotalKCalBurned = this.TotalKCalBurned.bind(this);
        this.addRow = this.addRow.bind(this);
        this.showRow = this.showRow.bind(this);
        this.showTable = this.showTable.bind(this);
        this.reset = this.reset.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.getGrandTotalKCalBurned = this.getGrandTotalKCalBurned.bind(this);
    };

    getKCalPerMinute = () => {
        const params = {
            MET: this.state.met_value,
            mass: this.state.current_mass,
            uom: this.state.current_mass_units
        }
        return KCalPerMinute(params);
    }

    TotalKCalBurned = () => {
        const { minutes_spent, kcal_burned_per_minute } = this.state;
        this.setState({ total_kcal_burned: minutes_spent * kcal_burned_per_minute });
    }

    getBMR = () => {
        return BMR(this.state);
    }

    getMinutesSpent = () => {
        return this.state.minutes_spent;
    }

    handleSelectCategory = (e) => {
        const { value } = e;
        this.setState({
            met_category: value,
            met_activity_name: '',
            met_value: ''
        });
    }

    handleSelectActivity = (e) => {
        const { label, value } = e;
        this.setState({
            met_activity_name: label,
            met_value: value
        });
    }

    handleChangeMinutes = (e, { name, value }) => {
        const kCalPerMinute = this.getKCalPerMinute();
        const minutesSpent = value;
        this.setState({
            [name]: minutesSpent,
            kcal_burned_per_minute: kCalPerMinute,
            total_kcal_burned: kCalPerMinute * minutesSpent
        });
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    };



    addRow = (e) => {
        e.preventDefault();
        const currDateTime = Date();
        const { met_category,
            met_activity_name,
            met_value,
            minutes_spent,
            kcal_burned_per_minute,
            total_kcal_burned,
            activityRecord } = this.state;

        const newActivityRecord = {
            id: uuid(),
            values: {
                created: currDateTime,
                met_category,
                met_activity_name,
                met_value,
                minutes_spent,
                kcal_burned_per_minute,
                total_kcal_burned
            }
        };

        activityRecord.push(newActivityRecord);

        this.setState({ activityRecord });
    }

    removeRow = (e) => {
        const deleteMe = e.target.name;
        this.setState({ activityRecord: this.state.activityRecord.filter(thisRecord => thisRecord.id !== deleteMe) });
    }

    getGrandTotalKCalBurned = () => {
        const { activityRecord } = this.state;
        let total = 0;
        if (activityRecord.length > 0) {
            total = activityRecord.map((theActivityRecord) => {
                return total + theActivityRecord.values.total_kcal_burned;
            });
        }
        return total;
    }


    showRow = (activityRecord) => {
        const { created, met_category, met_activity_name, met_value, minutes_spent, kcal_burned_per_minute, total_kcal_burned } = activityRecord.values;
        return (
            <Table.Row key={activityRecord.id}>
                <Table.Cell><Button name={activityRecord.id} onClick={this.removeRow}>x</Button></Table.Cell>
                <Table.Cell>{activityRecord.id}</Table.Cell>
                <Table.Cell>{Intl.DateTimeFormat('en-US').format(created)}</Table.Cell>
                <Table.Cell>{met_category}</Table.Cell>
                <Table.Cell>{met_activity_name}</Table.Cell>
                <Table.Cell>{met_value}</Table.Cell>
                <Table.Cell>{minutes_spent}</Table.Cell>
                <Table.Cell>{kcal_burned_per_minute.toFixed(2)}</Table.Cell>
                <Table.Cell>{total_kcal_burned.toFixed(2)}</Table.Cell>
            </Table.Row>
        )
    }

    showTable = () => {
        const { activityRecord } = this.state;
        if (activityRecord.length > 0) {
            return (
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Remove</Table.HeaderCell>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Time Created</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Activity</Table.HeaderCell>
                            <Table.HeaderCell>MET Value</Table.HeaderCell>
                            <Table.HeaderCell># of Minutes</Table.HeaderCell>
                            <Table.HeaderCell>KCal/Minute</Table.HeaderCell>
                            <Table.HeaderCell>Total KCal Burned</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {activityRecord.map(theActivityRecord => this.showRow(theActivityRecord))}
                </Table>
            );
        } else {
            return null;
        }
    }


    render() {

        const bmrParams = { mass: 93.44, height: 67, bodyFatPct: 33 };
        const currentBMR = BMR(bmrParams);
        const total_kcal_burned = this.state.total_kcal_burned;
        const { MET_Values, met_category, activityRecord } = this.state;

        const METCategories = [];
        const METActivities = [];

        for (let key in MET_Values) {
            METCategories.push({ label: key, value: key });
        }

        for (let key in MET_Values[met_category]) {
            METActivities.push(MET_Values[met_category][key]);
        }

        return (
            <Form>
                Your current BMR is: {currentBMR}
                <h1>What category of activity?</h1>
                <Select
                    fluid
                    label='Category'
                    autoFocus={true}
                    onChange={this.handleSelectCategory}
                    options={METCategories}
                />
                <h1>Which activity did you do?</h1>
                <Select
                    fluid
                    label='Exercise Type'
                    onChange={this.handleSelectActivity}
                    options={METActivities}
                />
                <Form.Group widths='equal'>
                    <Form.Input fluid
                        label='MET'
                        name='met_value'
                        value={this.state.met_value}
                        readOnly />
                    <Form.Input
                        fluid
                        label='Number of Minutes'
                        name='minutes_spent'
                        value={this.state.minutes_spent}
                        onChange={this.handleChangeMinutes} />
                    <Form.Input
                        fluid
                        label='Kcal burned / minute'
                        name='kcal_burned_per_minute'
                        value={this.state.kcal_burned_per_minute}
                        readOnly />
                    <Form.Input
                        fluid
                        label='Total Kcal burned'
                        name='total_kcal_burned'
                        value={this.state.total_kcal_burned}
                        readOnly />
                </Form.Group>
                <div>You are <a href="https://www.youtube.com/watch?v=VHF_bIjIPAE">burninating</a> {currentBMR + total_kcal_burned} kCal!</div>
                <h1 className="ui centered">Which category activity?</h1>
                <Button onClick={this.back}>Back</Button>
                <Button onClick={this.addRow}>Enter this activity record</Button>
                <Button onClick={this.handleSubmit}>Save for later</Button>
                <Button onClick={this.reset}>Reset Values</Button>
                {console.log(activityRecord)}
                {this.showTable()}
                <div>You're burning {this.getGrandTotalKCalBurned()} calories for this group of activities.  Great Job!!!</div>
            </Form >
        )
    };
}






