/* eslint-disable react/no-multi-comp */
import * as React from 'react';
import ReactDOM from 'react-dom';

import { alert, warn, success, error, info, confirm, force, Notie } from '../src';

class NotieExamples extends React.Component {
    handleSuccess = () => success('Success!');

    handleWarn = () => warn('Warn!');

    handleError = () => error('Error!');

    handleInfo = () => info('Info!');

    handleConfirm = () => {
        confirm('Are You sure?')
            .then(() => success('You selected yes!'))
            .catch(() => error('You selected no!'));
    };

    handleConfirmCustom = () => {
        confirm('Are You sure?', {
            yesBtnText: 'Hell Ya!',
            noBtnText: 'Abort!'
        })
            .then(() => success('You selected yeah!'))
            .catch(() => error('You selected abort!'));
    };

    handleForce = () => {
        force('You cannot do this');
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
                        onClick={this.handleConfirmCustom}>
                        Confirm with custom button texts
                    </button>
                </div>
                <br />
                <div className="pure-form">
                    Position:{' '}
                    <select value={this.props.position} onChange={this.props.onPositionChange}>
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                    </select>
                </div>
                <Notie />
            </div>
        );
    }
}

class App extends React.Component {
    state = {
        ttl: 5000,
        position: 'top'
    };

    handlePositionChange = e => {
        let { value } = e.target;
        this.setState({ position: value });
    };

    render() {
        return <NotieExamples {...this.state} onPositionChange={this.handlePositionChange} />;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
