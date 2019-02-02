import * as React from 'react';
import { css } from 'emotion';

export enum NotieLevel {
    INFO = 'INFO',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    WARN = 'WARN',
    FORCE = 'FORCE',
    CONFIRM = 'CONFIRM'
}

const colors: Record<NotieLevel, string> = {
    [NotieLevel.SUCCESS]: '#13ce66',
    [NotieLevel.ERROR]: '#ff4949',
    [NotieLevel.INFO]: '#20a0ff',
    [NotieLevel.WARN]: '#f5be4b',
    [NotieLevel.CONFIRM]: '#20a0ff',
    [NotieLevel.FORCE]: '#20a0ff'
};

//#region styled_components
export const notieContainer = css({
    position: 'fixed',
    width: '100%',
    textAlign: 'center',
    fontSize: '14px',
    color: '#fff',
    margin: '0 auto',
    whiteSpace: 'nowrap',
    border: 'none',
    textOverflow: 'ellipsis',
    left: 0,
    top: 0,
    padding: 0,
    pointerEvents: 'none',
    '&[open]': {
        pointerEvents: 'auto'
    }
});

export const notieMessage = css({
    padding: '20px'
});

export const notieChoices = css({
    display: 'flex',
    width: '100%'
});

export const notieButton = css({
    padding: '20px',
    flexGrow: 1,
    border: 'none',
    textAlign: 'center',
    cursor: 'pointer',
    outline: 'none'
});
//#endregion

/**
 * Settings for Notie
 */
export interface NotieSettings {
    /**
     * The message to be shown
     */
    message: string;
    /**
     * The type of alert-box to shown
     */
    level: NotieLevel;
    /**
     * Text to be shown for 'OK' button
     *
     * @default 'OK'
     */
    okBtnText?: string;
    /**
     * Text to be shown for 'Cancel' button
     *
     * @default 'Cancel'
     */
    cancelBtnText?: string;
    /**
     * The time (in ms) after which the alert-box disappears
     * @default 5000
     */
    ttl?: number;
}

export type NotieCallback = (...args: any[]) => void;

// export interface NotieContextAttributes extends NotieSettings {
//     success(message: string, ttl?: number): void;
//     error(message: string, ttl?: number): void;
//     warn(message: string, ttl?: number): void;
//     info(message: string, ttl?: number): void;
// confirm(
//     message: string,
//     props?: Pick<NotieSettings, 'okBtnText' | 'cancelBtnText'>
// ): Promise<unknown>;
//     force(
//         message: string,
//         props?: Pick<NotieSettings, 'okBtnText' | 'cancelBtnText'>
//     ): Promise<unknown>;
// }

const DEFAULT_STATE: NotieSettings = {
    message: '',
    level: NotieLevel.INFO,
    okBtnText: 'OK',
    cancelBtnText: 'Cancel'
};

let alreadyLoaded = false;

export const DEFAULT_TIMEOUT = 5000;

export class Notie extends React.Component<any, NotieSettings> {
    private dialog: HTMLDialogElement | null = null;
    private timeout: number | null = null;
    private confirmResolve!: NotieCallback;
    private confirmReject!: NotieCallback;

    static __singletonRef: Notie;

    static success(message: string, ttl?: number) {
        return Notie.__singletonRef.showSuccess(message, ttl);
    }

    static error(message: string, ttl?: number) {
        return Notie.__singletonRef.showError(message, ttl);
    }

    static warn(message: string, ttl?: number) {
        return Notie.__singletonRef.showWarn(message, ttl);
    }

    static info(message: string, ttl?: number) {
        return Notie.__singletonRef.showInfo(message, ttl);
    }

    static confirm(
        message: string,
        props?: Pick<NotieSettings, 'okBtnText' | 'cancelBtnText'>
    ): Promise<unknown> {
        return Notie.__singletonRef.showConfirm(message, props);
    }
    static force(
        message: string,
        props?: Pick<NotieSettings, 'okBtnText' | 'cancelBtnText'>
    ): Promise<unknown> {
        return Notie.__singletonRef.showForce(message, props);
    }

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

        Notie.__singletonRef = this;
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (alreadyLoaded) alreadyLoaded = false;
    }

    showNotie = (settings: NotieSettings) => {
        if (this.forced) return;

        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (this.dialog && this.dialog.open) {
            this.hideNotie(() => {
                this.showNotie(settings);
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
                { transform: 'translate3d(0, 0, 0)' },
                { transform: 'translate3d(0, -106%, 0)' }
            ] as any[],
            {
                duration: 300,
                direction: 'normal'
            }
        );

        a.onfinish = () => {
            if (this.dialog) this.dialog.close();
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

    showSuccess = (message: string, ttl?: number) => {
        this.showNotie({
            ...DEFAULT_STATE,
            level: NotieLevel.SUCCESS,
            message,
            ttl
        });
    };

    showError = (message: string, ttl?: number): void => {
        this.showNotie({
            ...DEFAULT_STATE,
            level: NotieLevel.ERROR,
            message,
            ttl
        });
    };

    showWarn = (message: string, ttl?: number): void => {
        this.showNotie({
            ...DEFAULT_STATE,
            level: NotieLevel.WARN,
            message,
            ttl
        });
    };

    showInfo = (message: string, ttl?: number): void => {
        this.showNotie({
            ...DEFAULT_STATE,
            level: NotieLevel.INFO,
            message,
            ttl
        });
    };

    showConfirm = async (
        message: string,
        props?: Pick<NotieSettings, 'okBtnText' | 'cancelBtnText'>
    ): Promise<unknown> => {
        // tslint:disable-next-line:no-inferred-empty-object-type
        return new Promise(
            (resolve, reject): void => {
                this.confirmResolve = resolve;
                this.confirmReject = reject;
                this.showNotie({
                    ...DEFAULT_STATE,
                    level: NotieLevel.CONFIRM,
                    ...props,
                    message
                });
            }
        );
    };

    showForce = async (
        message: string,
        props?: Pick<NotieSettings, 'okBtnText' | 'cancelBtnText'>
    ): Promise<unknown> => {
        // tslint:disable-next-line:no-inferred-empty-object-type
        return new Promise(
            (resolve, reject): void => {
                this.confirmResolve = resolve;
                this.confirmReject = reject;
                this.showNotie({
                    ...DEFAULT_STATE,
                    level: NotieLevel.FORCE,
                    ...props,
                    message
                });
            }
        );
    };

    render() {
        const { message, level } = this.state;

        return (
            <dialog
                className={notieContainer}
                ref={this.rootRef}
                style={{
                    backgroundColor: level in colors ? colors[level] : '#444'
                }}
                onClick={this.handleDismiss}
            >
                <div className={notieMessage}>{message}</div>
                {this.forced && (
                    <div className={notieChoices}>
                        <button
                            className={notieButton}
                            style={{
                                backgroundColor:
                                    colors[
                                        level === NotieLevel.FORCE
                                            ? NotieLevel.ERROR
                                            : NotieLevel.SUCCESS
                                    ]
                            }}
                            onClick={this.handleYes}
                        >
                            {this.state.okBtnText}
                        </button>
                        {level === NotieLevel.CONFIRM && (
                            <button
                                className={notieButton}
                                style={{
                                    backgroundColor: colors[NotieLevel.ERROR]
                                }}
                                onClick={this.handleNo}
                            >
                                {this.state.cancelBtnText}
                            </button>
                        )}
                    </div>
                )}
            </dialog>
        );
    }
}
