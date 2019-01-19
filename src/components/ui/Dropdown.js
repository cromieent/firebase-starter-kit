import React from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
export const DropdownFormField = props => {
    const { choices, data, label } = props;
    if (data) {
        return (
            <Form.Field>
                <Dropdown selection={choices}
                    value={data.value}
                    onChange={(/*param, */data) => props.input.onChange(data.value)}
                    placeholder={label}
                />
            </Form.Field>
        );
    }
    return (<div></div>);
}