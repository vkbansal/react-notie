/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

import notieContextShape from './context-shape';

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withToast(WrappedComponent) {
    return class extends Component {
        static displayName = `withNotie(${getDisplayName(WrappedComponent)})`;

        static contextTypes = {
            notie: notieContextShape
        }

        render() {
            return <WrappedComponent {...this.props} notie={this.context.notie} />;
        }
    };
}
