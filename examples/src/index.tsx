// tslint:disable:max-classes-per-file
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Notie } from 'react-notie';

import { WithNotieExamples as NotieExamples } from './NotieExamples';

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
        return (
            <Notie>
                <NotieExamples />
            </Notie>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
