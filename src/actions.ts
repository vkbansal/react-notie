export enum NotieLevel {
    INFO = 'INFO',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    WARN = 'WARN',
    FORCE = 'FORCE',
    CONFIRM = 'CONFIRM'
}

export enum NotieActions {
    SHOW = 'notie.show',
    HIDE = 'notie.hide'
}

export interface NotieSettings {
    message: string;
    level: NotieLevel;
    yesBtnText?: string;
    noBtnText?: string;
    ttl?: number;
}

export type NotieCallback = (...args: any[]) => void;

export interface NotieEventDetails extends NotieSettings {
    confirmResolve: NotieCallback;
    confirmReject: NotieCallback;
}

export function dispatchGlobalEvent(eventName: string, opts: any, target: EventTarget = window) {
    // Compatibale with IE
    // @see http://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
    let event;

    /* istanbul ignore else */
    if (typeof (<any>window).CustomEvent === 'function') {
        event = new (<any>window).CustomEvent(eventName, { detail: opts });
    } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, false, true, opts);
    }

    /* istanbul ignore else */
    if (target) {
        target.dispatchEvent(event);
    }
}

export function alert(settings: NotieSettings) {
    dispatchGlobalEvent(NotieActions.SHOW, settings);
}

export function success(message: string, ttl?: number) {
    alert({ message, level: NotieLevel.SUCCESS, ttl });
}

export function error(message: string, ttl?: number) {
    alert({ message, level: NotieLevel.ERROR, ttl });
}

export function warn(message: string, ttl?: number) {
    alert({ message, level: NotieLevel.WARN, ttl });
}

export function info(message: string, ttl?: number) {
    alert({ message, level: NotieLevel.INFO, ttl });
}

export function confirm(message: string, props?: Partial<NotieSettings>) {
    return new Promise((resolve, reject) => {
        alert(
            Object.assign({}, props, {
                message,
                level: NotieLevel.CONFIRM,
                confirmResolve: resolve,
                confirmReject: reject
            })
        );
    });
}

export function force(message: string, props?: Partial<NotieSettings>) {
    return new Promise((resolve, reject) => {
        alert(
            Object.assign({}, props, {
                message,
                level: NotieLevel.FORCE,
                confirmResolve: resolve,
                confirmReject: reject
            })
        );
    });
}
