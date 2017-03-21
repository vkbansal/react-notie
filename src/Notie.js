import React, { Component } from 'react';
import cx from 'classnames';

export default class Notie extends Component {
    state = {
        message: '',
        level: 'INFO',
        visible: false
    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.visible !== nextState.visible;
    }

    alert = (props) => {
        if (this.state.visible) {
            if (this.timeout) clearTimeout(this.timeout);
            this.hide();

            // match the timeout with CSS transitions + some buffer
            this.callback = setTimeout(() => this.alert(props), 310);

            return;
        }

        if (this.callback) {
            clearTimeout(this.callback);
        }

        this.setState(state => Object.assign({}, state, {
            message: props.message,
            level: props.level,
            visible: true
        }));

        this.timeout = setTimeout(() => this.hide(), props.ttl || 5000);
    }

    success = (message, props) => {
        this.alert(Object.assign({}, props, { message, level: 'SUCCESS' }));
    }

    error = (message, props) => {
        this.alert(Object.assign({}, props, { message, level: 'ERROR' }));
    }

    warn = (message, props) => {
        this.alert(Object.assign({}, props, { message, level: 'WARN' }));
    }

    info = (message, props) => {
        this.alert(Object.assign({}, props, { message, level: 'INFO' }));
    }

    hide = () => {
        this.setState(state => Object.assign({}, state, { visible: false }));
    }

    render() {
        const { message, level, visible } = this.state;
        const classes = cx('react-notie', [`react-notie-level--${level.toLowerCase()}`], {
            'react-notie--active': visible
        });

        return (
            <div className={classes}>
                {message}
            </div>
        );
    }
}
