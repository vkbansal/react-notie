import React, { Component } from 'react';
import cx from 'classnames';

const defaultState = () => ({
    visible: false,
    locked: false,
    yesBtnText: 'Yes',
    noBtnText: 'No'
});

export default class Notie extends Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({
            message: '',
            level: 'INFO'
        }, defaultState());
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.visible !== nextState.visible;
    }

    componentWillUnmount() {
        if (this.transitionendCallback) {
            this.root.removeEventListener('transitionend', this.transitionendCallback);
            this.transitionendCallback = null;
        }

        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    alert = (props = {}) => {
        if (this.state.locked) return;

        const toLock = props.level === 'CONFIRM';

        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (this.state.visible) {
            this.hide();

            this.transitionendCallback = () => {
                this.alert(props);
                this.root.removeEventListener('transitionend', this.transitionendCallback);
                this.transitionendCallback = null;
            };
            this.root.addEventListener('transitionend', this.transitionendCallback);

            return;
        }

        this.setState(state => ({
            message: props.message,
            level: props.level,
            visible: true,
            locked: toLock,
            yesBtnText: props.yesBtnText || state.yesBtnText,
            noBtnText: props.noBtnText || state.noBtnText
        }));

        if (!toLock) {
            this.timeout = setTimeout(() => {
                this.hide();
                this.timeout = null;
            }, props.ttl || 5000);
        }
    }

    confirm = (message, props) => {
        this.alert(Object.assign({}, props, { message, level: 'CONFIRM' }));

        return new Promise((resolve, reject) => {
            this.confirmResolve = resolve;
            this.confirmReject = reject;
        });
    }

    success = (message, ttl) => {
        this.alert({ message, level: 'SUCCESS', ttl });
    }

    error = (message, ttl) => {
        this.alert({ message, level: 'ERROR', ttl });
    }

    warn = (message, ttl) => {
        this.alert({ message, level: 'WARN', ttl });
    }

    info = (message, ttl) => {
        this.alert({ message, level: 'INFO', ttl });
    }

    hide = () => {
        this.setState(() => defaultState());
    }

    handleYes = () => {
        this.hide();
        this.transitionendCallback = () => {
            /* istanbul ignore next */
            if (typeof this.confirmResolve === 'function') {
                this.confirmResolve();
            }
            this.root.removeEventListener('transitionend', this.transitionendCallback);
            this.transitionendCallback = null;
        };
        this.root.addEventListener('transitionend', this.transitionendCallback);
    }

    handleNo = () => {
        this.hide();
        this.transitionendCallback = () => {
            /* istanbul ignore next */
            if (typeof this.confirmReject === 'function') {
                this.confirmReject();
            }
            this.root.removeEventListener('transitionend', this.transitionendCallback);
            this.transitionendCallback = null;
        };
        this.root.addEventListener('transitionend', this.transitionendCallback);
    }

    rootRef = c => (this.root = c);

    render() {
        const { message, level, visible } = this.state;
        const classes = cx('react-notie', [`react-notie-level--${level.toLowerCase()}`], {
            'react-notie--active': visible
        });

        return (
            <div ref={this.rootRef} className={classes}>
                {level === 'CONFIRM' && <div className='react-notie-overlay' />}
                <div className='react-notie-container'>
                    <div className='react-notie-message'>{message}</div>
                    {level === 'CONFIRM' && (
                        <div className='react-notie-choices'>
                            <div className='react-notie-choice react-notie-choice--yes' onClick={this.handleYes}>
                                {this.state.yesBtnText}
                            </div>

                            <div className='react-notie-choice react-notie-choice--no' onClick={this.handleNo}>
                                {this.state.noBtnText}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
