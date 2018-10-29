import * as React from 'react';

import {
    // notieAlert,
    notieWarn,
    notieSuccess,
    notieError,
    notieInfo,
    notieConfirm,
    notieForce,
    Notie
} from 'react-notie';

export class NotieExamples extends React.Component {
    handleSuccess = () => {
        notieSuccess('Success!');
    };

    handleWarn = () => {
        notieWarn('Warn!');
    };

    handleError = () => {
        notieError('Error!');
    };

    handleInfo = () => {
        notieInfo('Info!');
    };

    handleConfirm = () => {
        notieConfirm('Are You sure?')
            .then(() => {
                notieSuccess('You selected yes!');
            })
            .catch(() => {
                notieError('You selected no!');
            });
    };

    handleConfirmCustom = () => {
        notieConfirm('Are You sure?', {
            okBtnText: 'Hell Ya!',
            cancelBtnText: 'Abort!'
        })
            .then(() => {
                notieSuccess('You selected yeah!');
            })
            .catch(() => {
                notieError('You selected abort!');
            });
    };

    handleForce = () => {
        notieForce('You cannot do this');
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
                <br />
                <Notie />
            </div>
        );
    }
}
