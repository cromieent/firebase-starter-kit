import React, { Component } from 'react';
import WizardFormFirstPage from './WizardFormFirstPage';
import WizardFormSecondPage from './WizardFormSecondPage';
import WizardFormResultsPage from './WizardFormResultsPage';

class WizardForm extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            page: 1
        }
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 });
    }
    previousPage() {
        this.setState({ page: this.state.page - 1 });
    }

    render() {
        const { page } = this.state;
        return (
            <div>
                {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage} />}
                {page === 2 && (
                    <WizardFormSecondPage
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
                {page === 3 && (
                    <WizardFormResultsPage
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
            </div>
        )
    }
}

export default WizardForm;