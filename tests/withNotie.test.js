import React from 'react';
import { mount } from 'enzyme';

import NotieProvider from '../src/NotieProvider';
import withNotie from '../src/withNotie';

describe('withNotie', () => {
    let component;
    let rootProps;
    let ContextChecker = function (props, context) {
        rootProps = props;
        return null;
    };

    ContextChecker = withNotie(ContextChecker);

    beforeEach(() => {
        component = mount(
            <NotieProvider>
                <ContextChecker />
            </NotieProvider>
        );
    });

    afterEach(() => {
        component.unmount();
        rootProps = undefined;
    });

    test('alert method', () => {
        expect(rootProps.notie).toHaveProperty('alert');
        expect(typeof rootProps.notie.alert).toBe('function');
    });

    test('confirm method', () => {
        expect(rootProps.notie).toHaveProperty('confirm');
        expect(typeof rootProps.notie.confirm).toBe('function');
    });

    test('success method', () => {
        expect(rootProps.notie).toHaveProperty('success');
        expect(typeof rootProps.notie.success).toBe('function');
    });

    test('warn method', () => {
        expect(rootProps.notie).toHaveProperty('warn');
        expect(typeof rootProps.notie.warn).toBe('function');
    });

    test('error method', () => {
        expect(rootProps.notie).toHaveProperty('error');
        expect(typeof rootProps.notie.error).toBe('function');
    });

    test('info methods', () => {
        expect(rootProps.notie).toHaveProperty('info');
        expect(typeof rootProps.notie.info).toBe('function');
    });
});
