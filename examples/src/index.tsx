import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Notie } from 'react-notie';

import { NotieExamples } from './NotieExamples';

interface AppState {
    ttl: number;
    position: string;
}

function App() {
    return (
        <div>
            <NotieExamples />
            <Notie />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
