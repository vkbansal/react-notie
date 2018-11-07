import * as React from 'react';

import { NotieContext, NotieContextAttributes } from './Notie';

export type ShowNotieMethods = Pick<
    NotieContextAttributes,
    'confirm' | 'error' | 'info' | 'success' | 'warn' | 'force'
>;

export interface WithNotieProps {
    notie: ShowNotieMethods;
}

export function withNotie<T = {}>(
    Component: React.ComponentType<T & WithNotieProps>
): React.ComponentType<T> {
    function NotieWrapper(props: T): React.ReactElement<T> {
        return (
            <NotieContext.Consumer>
                {({ confirm, error, info, success, warn, force }) => (
                    <Component {...props} notie={{ confirm, error, info, success, warn, force }} />
                )}
            </NotieContext.Consumer>
        );
    }

    return NotieWrapper;
}
