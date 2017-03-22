/* eslint-env browser */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { NotieProvider, withNotie } from '../src';

@withNotie
class NotieExamples extends Component {
    static propTypes = {
        notie: PropTypes.object.isRequired
    };

    handleSuccess = () => this.props.notie.success('Success!');

    handleWarn = () => this.props.notie.warn('Warn!');

    handleError = () => this.props.notie.error('Error!');

    handleInfo = () => this.props.notie.info('Info!');

    handleConfirm = () => {
        this.props.notie.confirm('Are You sure?')
            .then(() => this.props.notie.success('You selected yes!'))
            .catch(() => this.props.notie.error('You selected no!'));
    }

    handleConfirmCustom = () => {
        this.props.notie.confirm('Are You sure?', {
            yesBtnText: 'Hell Ya!',
            noBtnText: 'Abort!'
        }).then(() => this.props.notie.success('You selected yeah!'))
            .catch(() => this.props.notie.error('You selected abort!'));
    }

    render() {
        return (
            <div>
                <button className='button-success pure-button' onClick={this.handleSuccess}>
                    Success
                </button>
                <button className='button-warning pure-button' onClick={this.handleWarn}>
                    Warn
                </button>
                <button className='button-error pure-button' onClick={this.handleError}>
                    Error
                </button>
                <button className='button-info pure-button' onClick={this.handleInfo}>
                    Info
                </button>

                <button className='button-secondary pure-button' onClick={this.handleConfirm}>
                    Confirm
                </button>

                <button className='button-secondary pure-button' onClick={this.handleConfirmCustom}>
                    Confirm with custom button texts
                </button>
            </div>
        );
    }
}

const App = (
    <NotieProvider>
        <NotieExamples />
    </NotieProvider>
);

ReactDOM.render(App, document.getElementById('root'));
