import * as React from 'react';

import {
    NotieActions,
    NotieSettings,
    NotieLevel,
    notieAlert,
    NotieCallback,
    NotieEventDetails
} from './actions';

import { NotieContainer, NotieMessage, NotieChoices, NotieButton } from './components';

export interface NotieState extends Pick<NotieSettings, 'message' | 'level'> {
    okBtnText: string;
    cancelBtnText: string;
    position: 'top' | 'bottom';
}

const DEFAULT_STATE: NotieState = {
    message: '',
    level: NotieLevel.INFO,
    position: 'top',
    okBtnText: 'OK',
    cancelBtnText: 'Cancel'
};

let alreadyLoaded = false;

const DEFAULT_TIMEOUT = 5000;

export class Notie extends React.Component<any, NotieState> {
    private dialog: HTMLDialogElement | null = null;
    private timeout: number | null = null;
    private confirmResolve!: NotieCallback;
    private confirmReject!: NotieCallback;

    constructor(props: any) {
        super(props);

        this.state = {
            ...DEFAULT_STATE
        };

        if (alreadyLoaded) {
            throw new Error(
                '<Notie /> is already loaded somwhere in your code. Please include it only once.'
            );
        }

        alreadyLoaded = true;
    }

    componentDidMount() {
        window.addEventListener(NotieActions.SHOW, this.showNotie);
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (alreadyLoaded) alreadyLoaded = false;

        window.removeEventListener(NotieActions.SHOW, this.showNotie);
    }

    showNotie = (event: Event) => {
        if (this.forced) return;

        const settings: NotieEventDetails = (event as CustomEvent).detail;

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

        if (this.dialog && this.dialog.open) {
            this.hideNotie(() => {
                notieAlert(settings);
            });

            return;
        }

        this.setState(
            (state) => ({
                message: settings.message,
                level: settings.level,
                okBtnText: settings.okBtnText || state.okBtnText,
                cancelBtnText: settings.cancelBtnText || state.cancelBtnText
            }),
            () => {
                if (!this.dialog) return;

                if (this.forced) {
                    this.dialog.showModal();
                } else {
                    this.dialog.show();
                    this.timeout = window.setTimeout(() => {
                        this.hideNotie();
                        this.timeout = null;
                    }, settings.ttl || DEFAULT_TIMEOUT);
                }

                this.dialog.animate(
                    [
                        { transform: 'translate3d(0, -106%, 0)' },
                        { transform: 'translate3d(0, 0, 0)' }
                    ] as any[],
                    {
                        duration: 300,
                        direction: 'normal'
                    }
                );
            }
        );
    };

    hideNotie = (callback?: NotieCallback) => {
        if (!this.dialog) return;

        const a = this.dialog.animate(
            [
                { transform: 'translate3d(0, 0, 0)', opacity: 1 },
                { transform: 'translate3d(0, -106%, 0)', opacity: 0 }
            ] as any[],
            {
                duration: 300,
                direction: 'normal'
            }
        );

        a.onfinish = () => {
            if (typeof callback === 'function') callback();
            this.setState(DEFAULT_STATE);
        };
    };

    handleYes = () => {
        this.hideNotie(this.confirmResolve);
    };

    handleNo = () => {
        this.hideNotie(this.confirmReject);
    };

    handleDismiss = () => {
        if (this.forced) return;

        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (this.dialog && this.dialog.open) {
            this.hideNotie();
        }
    };

    rootRef = (c: HTMLDialogElement) => {
        this.dialog = c;
    };

    get forced() {
        const { level } = this.state;

        return level === NotieLevel.CONFIRM || level === NotieLevel.FORCE;
    }

    render() {
        const { message, level, position } = this.state;

        return (
            <NotieContainer
                innerRef={this.rootRef}
                position={position}
                level={level}
                onClick={this.handleDismiss}
            >
                <NotieMessage>{message}</NotieMessage>
                {this.forced && (
                    <NotieChoices>
                        <NotieButton
                            level={
                                level === NotieLevel.FORCE ? NotieLevel.ERROR : NotieLevel.SUCCESS
                            }
                            onClick={this.handleYes}
                        >
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
        );
    }
}
