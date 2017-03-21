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

    render() {
        return (
            <div className='container'>
                <h1>react-notie</h1>
                <p>Simple notifications for react</p>
                <br />
                <p>Demo:</p>
                <div>
                    <button onClick={this.handleSuccess}>
                        Success
                    </button>
                    <button onClick={this.handleWarn}>
                        Warn
                    </button>
                    <button onClick={this.handleError}>
                        Error
                    </button>
                    <button onClick={this.handleInfo}>
                        Info
                    </button>
                </div>
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
