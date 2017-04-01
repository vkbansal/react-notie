import React, { Component, PropTypes } from 'react';

import notieContextShape from './context-shape';
import Notie from './Notie';

class NotieProvider extends Component {
    static childContextTypes = {
        notie: notieContextShape
    };

    static propTypes = {
        children: PropTypes.node.isRequired
    }

    /* istanbul ignore next */
    getChildContext() {
        return {
            notie: {
                alert: (...props) => this.notie.alert(...props),
                confirm: (...props) => this.notie.confirm(...props),
                success: (...props) => this.notie.success(...props),
                warn: (...props) => this.notie.warn(...props),
                error: (...props) => this.notie.error(...props),
                info: (...props) => this.notie.info(...props)
            }
        };
    }

    notieRef = (c) => {
        this.notie = c;
    }

    render() {
        const { children, ...rest } = this.props;

        return (
            <div>
                {children}
                <Notie ref={this.notieRef} {...rest} />
            </div>
        );
    }
}

export default NotieProvider;
