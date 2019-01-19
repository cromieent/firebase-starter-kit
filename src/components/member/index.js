import { React, Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form';

class MemberInfoForm extends Component {

    MemberInfoForm = props => {
        const { fullName,
            pristine,
            reset,
            submitting
        } = props;

        return (
            <form onSubmit={this.props.showResults}>
                <div>
                    <label>Name: </label>
                    <div>
                        <Field name="fullName" component="input" type="text" placeholder="Full Name" />
                    </div>
                </div>
                <div>
                    <button type="submit" disabled={pristine || submitting}>
                        Submit {fullName}
                    </button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}>
                        Clear Values
                </button>
                </div>
            </form>
        )
    };

    MemberInfoForm = reduxForm({
        form: 'memberInfo'
    })(MemberInfoForm);

    selector = formValueSelector('memberInfo');

    MemberInfoForm = connect(state => {
        const fullName = this.selector(state, 'fullName');
        return {
            fullName
        }
    })(MemberInfoForm);
}
export default MemberInfoForm;
