// tslint:disable:max-classes-per-file
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { NotieExamples } from './NotieExamples';

interface AppState {
    ttl: number;
    position: string;
}

class App extends React.Component<{}, AppState> {
    state: AppState = {
        ttl: 5000,
        position: 'top'
    };

    render() {
        return <NotieExamples {...this.state} />;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
