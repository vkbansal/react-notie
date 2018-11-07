import * as React from 'react';

import { withNotie, WithNotieProps } from 'react-notie';

export class NotieExamples extends React.Component<WithNotieProps> {
    // static contextType = NotieContext;

    // context!: NotieContextAttributes;

    handleSuccess = () => {
        this.props.notie.success('Success!');
    };

    handleWarn = () => {
        this.props.notie.warn('Warn!');
    };

    handleError = () => {
        this.props.notie.error('Error!');
    };

    handleInfo = () => {
        this.props.notie.info('Info!');
    };

    handleConfirm = () => {
        this.props.notie
            .confirm('Are You sure?')
            .then(() => {
                this.props.notie.success('You selected yes!');
            })
            .catch(() => {
                this.props.notie.error('You selected no!');
            });
    };

    handleConfirmCustom = () => {
        this.props.notie
            .confirm('Are You sure?', {
                okBtnText: 'Yeah!',
                cancelBtnText: 'Abort!'
            })
            .then(() => {
                this.props.notie.success('You selected yeah!');
            })
            .catch(() => {
                this.props.notie.error('You selected abort!');
            });
    };

    handleForce = () => {
        this.props.notie.force('You cannot do this');
    };

    render() {
        // tslint:disable-next-line
        console.log(this.props.notie);

        return (
            <div>
                <div>
                    <button className="button-success pure-button" onClick={this.handleSuccess}>
                        Success
                    </button>
                    <button className="button-warning pure-button" onClick={this.handleWarn}>
                        Warn
                    </button>
                    <button className="button-error pure-button" onClick={this.handleError}>
                        Error
                    </button>
                    <button className="button-info pure-button" onClick={this.handleInfo}>
                        Info
                    </button>
                    <button className="button-secondary pure-button" onClick={this.handleConfirm}>
                        Confirm
                    </button>

                    <button className="button-secondary pure-button" onClick={this.handleForce}>
                        Force
                    </button>
                    <button
                        className="button-secondary pure-button"
                        onClick={this.handleConfirmCustom}
                    >
                        Confirm with custom button texts
                    </button>
                </div>
            </div>
        );
    }
}

export const WithNotieExamples = withNotie<{}>(NotieExamples);
