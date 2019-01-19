import React from 'react';
import Select from 'react-select';

import { exerciseType } from '../support/listOfValues';

export default class ExerciseTypeSelector extends React.Component {
    render() {
        return (
            <div>
                <Select options={exerciseType} />
            </div>
        );
    };
};

