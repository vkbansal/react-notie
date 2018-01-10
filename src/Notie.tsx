import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    NotieActions,
    NotieSettings,
    NotieLevel,
    alert,
    NotieCallback,
    NotieEventDetails
} from './actions';

import {
    NotieContainer,
    NotieMessage,
    NotieChoices,
    NotieButton,
    NotieOverlay
} from './components';

const DEFAULT_STATE = {
    visible: false,
    locked: false,
    position: 'top',
    okBtnText: 'OK',
    cancelBtnText: 'Cancel'
};

export interface NotieProps {}

export interface NotieState extends Pick<NotieSettings, 'message' | 'level'> {
    visible: boolean;
    locked: boolean;
    okBtnText: string;
    cancelBtnText: string;
    position: 'top' | 'bottom';
}

let alreadyLoaded = false;

const DEFAULT_TIMEOUT = 5000;

export class Notie extends React.Component<NotieProps, NotieState> {
    private root: HTMLDivElement;
    private notieRoot: HTMLDivElement | null;
    private transitionendCallback: null | NotieCallback;
    private timeout: number | null;
    private confirmResolve: NotieCallback;
    private confirmReject: NotieCallback;

    constructor(props: NotieProps) {
        super(props);

        this.state = {
            message: '',
            level: NotieLevel.INFO,
            visible: false,
            locked: false,
            position: 'top',
            okBtnText: 'OK',
            cancelBtnText: 'Cancel'
        };
        this.root = document.createElement('div');
    }

    componentWillMount() {
        if (alreadyLoaded)
            throw new Error(
                '<Notie /> is already loaded somwhere in your code. Please include it only once.'
            );

        alreadyLoaded = true;
    }

    componentDidMount() {
        if (this.notieRoot) this.notieRoot.style.opacity = '0';
        window.addEventListener(NotieActions.SHOW, this.showNotie);
        document.body.appendChild(this.root);
    }

    shouldComponentUpdate(_: NotieProps, nextState: NotieState) {
        return this.state.visible !== nextState.visible;
    }

    componentWillUnmount() {
        if (this.transitionendCallback) {
            this.notieRoot &&
                this.notieRoot.removeEventListener('transitionend', this.transitionendCallback);
            this.transitionendCallback = null;
        }

        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (alreadyLoaded) alreadyLoaded = false;

        window.removeEventListener(NotieActions.SHOW, this.showNotie);
        document.body.removeChild(this.root);
    }

    showNotie = (event: Event) => {
        if (this.state.locked) return;

        const settings: NotieEventDetails = (event as CustomEvent).detail;
        const toLock = settings.level === NotieLevel.CONFIRM || settings.level === NotieLevel.FORCE;

        if (settings.confirmReject && settings.confirmResolve) {
            this.confirmReject = settings.confirmReject;
            this.confirmResolve = settings.confirmResolve;
        } else {
            delete this.confirmReject;
            delete this.confirmResolve;
        }

        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (this.state.visible) {
            this.hideNotie(() => alert(settings));
            return;
        }

        if (this.notieRoot) this.notieRoot.style.opacity = '1';

        this.setState(state => ({
            message: settings.message,
            level: settings.level,
            visible: true,
            locked: toLock,
            okBtnText: settings.yesBtnText || state.okBtnText,
            cancelBtnText: settings.noBtnText || state.cancelBtnText
        }));

        if (!toLock) {
            this.timeout = window.setTimeout(() => {
                this.hideNotie();
                this.timeout = null;
            }, settings.ttl || DEFAULT_TIMEOUT);
        }
    };

    hideNotie = (callback?: NotieCallback) => {
        this.setState(DEFAULT_STATE as NotieState);
        this.transitionendCallback = () => {
            if (this.notieRoot) this.notieRoot.style.opacity = '0';
            if (typeof callback === 'function') callback();
            this.notieRoot &&
                this.notieRoot.removeEventListener('transitionend', this
                    .transitionendCallback as NotieCallback);
            this.transitionendCallback = null;
        };
        this.notieRoot &&
            this.notieRoot.addEventListener('transitionend', this.transitionendCallback);
    };

    handleYes = () => this.hideNotie(this.confirmResolve);

    handleNo = () => this.hideNotie(this.confirmReject);

    handleDismiss = () => {
        if (this.state.locked) return;

        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (this.state.visible) {
            this.hideNotie();
        }
    };

    rootRef = (c: HTMLDivElement) => (this.notieRoot = c);

    render() {
        const { message, level, visible, position } = this.state;
        const forced = level === NotieLevel.CONFIRM || level === NotieLevel.FORCE;

        return ReactDOM.createPortal(
            <div ref={this.rootRef}>
                {forced && visible && <NotieOverlay />}
                <NotieContainer
                    active={visible}
                    position={position}
                    level={level}
                    onClick={this.handleDismiss}>
                    <NotieMessage>{message}</NotieMessage>
                    {forced && (
                        <NotieChoices>
                            <NotieButton
                                level={
                                    level === NotieLevel.FORCE
                                        ? NotieLevel.ERROR
                                        : NotieLevel.SUCCESS
                                }
                                onClick={this.handleYes}>
                                {this.state.okBtnText}
                            </NotieButton>
                            {level === NotieLevel.CONFIRM && (
                                <NotieButton level={NotieLevel.ERROR} onClick={this.handleNo}>
                                    {this.state.cancelBtnText}
                                </NotieButton>
                            )}
                        </NotieChoices>
                    )}
                </NotieContainer>
            </div>,
            this.root
        );
    }
}
