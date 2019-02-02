import * as React from 'react';

import { Notie } from 'react-notie';

export class NotieExamples extends React.Component {
    handleSuccess = () => {
        Notie.success('Success!');
    };

    handleWarn = () => {
        Notie.warn('Warn!');
    };

    handleError = () => {
        Notie.error('Error!');
    };

    handleInfo = () => {
        Notie.info('Info!');
    };

    handleConfirm = () => {
        Notie.confirm('Are You sure?')
            .then(() => {
                Notie.success('You selected yes!');
            })
            .catch(() => {
                Notie.error('You selected no!');
            });
    };

    handleConfirmCustom = () => {
        Notie.confirm('Are You sure?', {
            okBtnText: 'Yeah!',
            cancelBtnText: 'Abort!'
        })
            .then(() => {
                Notie.success('You selected yeah!');
            })
            .catch(() => {
                Notie.error('You selected abort!');
            });
    };

    handleForce = () => {
        Notie.force('You cannot do this');
    };

    render() {
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
