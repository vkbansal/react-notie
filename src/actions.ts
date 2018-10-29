/**
 * The type of alert-box to shown
 */
export enum NotieLevel {
    INFO = 'INFO',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    WARN = 'WARN',
    FORCE = 'FORCE',
    CONFIRM = 'CONFIRM'
}

/**
 * @private
 */
export enum NotieActions {
    SHOW = 'react-notie.show',
    HIDE = 'react-notie.hide'
}

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

/**
 * @private
 */
export type NotieCallback = (...args: any[]) => void;

/**
 * @private
 */
export interface NotieEventDetails extends NotieSettings {
    confirmResolve?: NotieCallback;
    confirmReject?: NotieCallback;
}

/**
 * @private
 */
export function dispatchGlobalEvent(eventName: string, opts: any, target: EventTarget = window) {
    // Compatibale with IE
    // @see http://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
    let event;

    if (typeof (window as any).CustomEvent === 'function') {
        event = new (window as any).CustomEvent(eventName, { detail: opts });
    } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, false, true, opts);
    }

    if (target) {
        target.dispatchEvent(event);
    }
}

/**
 * Method to show the alert-box
 */
export function notieAlert(settings: NotieEventDetails) {
    dispatchGlobalEvent(NotieActions.SHOW, settings);
}

/**
 * Convenience method for showing message with level set to `SUCCESS`
 * @param {string} message The message to be shown
 * @param {number} ttl     The time (in ms) after which the alert-box disappears
 *
 * @returns {void}
 */
export function notieSuccess(message: string, ttl?: number): void {
    notieAlert({ message, level: NotieLevel.SUCCESS, ttl });
}

/**
 * Convenience method for showing message with level set to `ERROR`
 * @param {string} message The message to be shown
 * @param {number} ttl     The time (in ms) after which the alert-box disappears
 *
 * @returns {void}
 */
export function notieError(message: string, ttl?: number): void {
    notieAlert({ message, level: NotieLevel.ERROR, ttl });
}

/**
 * Convenience method for showing message with level set to `WARN`
 * @param {string} message The message to be shown
 * @param {number} ttl     The time (in ms) after which the alert-box disappears
 *
 * @returns {void}
 */
export function notieWarn(message: string, ttl?: number): void {
    notieAlert({ message, level: NotieLevel.WARN, ttl });
}

/**
 * Convenience method for showing message with level set to `INFO`
 * @param {string} message The message to be shown
 * @param {number} ttl     The time (in ms) after which the alert-box disappears
 *
 * @returns {void}
 */
export function notieInfo(message: string, ttl?: number): void {
    notieAlert({ message, level: NotieLevel.INFO, ttl });
}

/**
 * Shows a confirmation message with OK/Cancel options.
 * @param {string} message The message to be shown
 *
 * @returns {Promise} This will be resolved if `OK` is selected and will be rejected if `Cancel` is selected.
 */
export async function notieConfirm(
    message: string,
    props?: Pick<NotieSettings, 'okBtnText' | 'cancelBtnText'>
): Promise<unknown> {
    return new Promise<void>(
        (resolve: any, reject: any): void => {
            notieAlert({
                ...props,
                message,
                level: NotieLevel.CONFIRM,
                confirmResolve: resolve,
                confirmReject: reject
            });
        }
    );
}

/**
 * Shows a message with an `OK` Button.
 * @param {string} message The message to be shown
 *
 * @returns {Promise} This will be resolved if `OK` is selected.
 */
export async function notieForce(
    message: string,
    props?: Pick<NotieSettings, 'okBtnText' | 'cancelBtnText'>
): Promise<unknown> {
    return new Promise<void>(
        (resolve: any, reject: any): void => {
            notieAlert({
                ...props,
                message,
                level: NotieLevel.FORCE,
                confirmResolve: resolve,
                confirmReject: reject
            });
        }
    );
}
