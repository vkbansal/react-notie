import * as React from 'react';
import { mount } from 'enzyme';

import { withNotie, WithNotieProps } from '../withNotie';

function TestComponent(_: WithNotieProps) {
    return <div className="test" />;
}

const WithNotieComponent = withNotie<{}>(TestComponent);

describe('withNotie', () => {
    test('passes notie as props', () => {
        const consumer = mount(<WithNotieComponent />);
        const props = consumer.find(TestComponent).props();

        expect(Object.keys(props.notie)).toEqual([
            'confirm',
            'error',
            'info',
            'success',
            'warn',
            'force'
        ]);
    });
});
