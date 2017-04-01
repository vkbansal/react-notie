import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

const defaultState = () => ({
    visible: false,
    locked: false,
    yesBtnText: 'Yes',
    noBtnText: 'No'
});

export default class Notie extends Component {
    static defaultProps = {
        ttl: 5000,
        position: 'top'
    };

    static propTypes = {
        ttl: PropTypes.number,
        position: PropTypes.oneOf(['top', 'bottom'])
    };

    constructor(props) {
        super(props);

        this.state = Object.assign({
            message: '',
            level: 'INFO'
        }, defaultState());
    }

    componentDidMount() {
        this.root.style.opacity = 0;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.visible !== nextState.visible
            || this.props.position !== nextProps.position;
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

    alert = (settings = {}) => {
        if (this.state.locked) return;

        const toLock = settings.level === 'CONFIRM';

        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (this.state.visible) {
            this.hide(() => this.alert(settings));
            return;
        }

        this.root.style.opacity = 1;

        this.setState(state => ({
            message: settings.message,
            level: settings.level,
            visible: true,
            locked: toLock,
            yesBtnText: settings.yesBtnText || state.yesBtnText,
            noBtnText: settings.noBtnText || state.noBtnText
        }));

        if (!toLock) {
            this.timeout = setTimeout(() => {
                this.hide();
                this.timeout = null;
            }, settings.ttl || this.props.ttl);
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

    hide = (callback) => {
        this.setState(() => defaultState());
        this.transitionendCallback = () => {
            this.root.style.opacity = 0;
            if (typeof callback === 'function') callback();
            this.root.removeEventListener('transitionend', this.transitionendCallback);
            this.transitionendCallback = null;
        };
        this.root.addEventListener('transitionend', this.transitionendCallback);
    }

    handleYes = () => this.hide(this.confirmResolve);

    handleNo = () => this.hide(this.confirmReject);

    handleDismiss = () => {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (this.state.visible) {
            this.hide();
        }
    }

    rootRef = c => (this.root = c);

    render() {
        const { message, level, visible } = this.state;
        const classes = cx(
            'react-notie',
            `react-notie--${this.props.position.toLowerCase()}`,
            `react-notie-level--${level.toLowerCase()}`,
            {
                'react-notie--active': visible
            }
        );

        return (
            <div ref={this.rootRef} className={classes}>
                {level === 'CONFIRM' && visible && <div className='react-notie-overlay' />}
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
                    {level !== 'CONFIRM' && <div className='react-notie-dismiss' onClick={this.handleDismiss} />}
                </div>
            </div>
        );
    }
}
