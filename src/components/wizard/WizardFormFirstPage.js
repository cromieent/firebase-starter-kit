import React from 'react';
import { reduxForm } from 'redux-form';
import validate from '../support/validate';
import Member from '../member';

const WizardFormFirstPage = props => {
    const { handleSubmit } = props;
    return (
        <div>
            <form onSubmit={handleSubmit} className="ui form">
                <div>
                    <button type="submit" className="next">
                        Next
                  </button>
                </div>
            </form>
        </div>
    );
}

export default reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(WizardFormFirstPage);