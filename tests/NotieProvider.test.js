import React from 'react';
import { shallow, mount } from 'enzyme';

import NotieProvider from '../src/NotieProvider';
import contextShape from '../src/context-shape';

describe('<NotieProvider />', () => {
    let component;

    beforeEach(() => {
        component = shallow(
            <NotieProvider>
                <div>some children</div>
            </NotieProvider>
        );
    });

    afterEach(() => {
        component.unmount();
    });

    test('renders correctly with children', () => {
        expect(component).toMatchSnapshot();
    });

    test('has notieRef', () => {
        expect(component.instance().notieRef).toBeDefined();
    });

    describe('context', () => {
        let rootContext;
        let componentWithContext;
        function ContextChecker(props, context) {
            rootContext = context;
            return null;
        }

        ContextChecker.contextTypes = {
            notie: contextShape
        };

        beforeEach(() => {
            componentWithContext = mount(
                <NotieProvider>
                    <ContextChecker />
                </NotieProvider>
            );
        });

        afterEach(() => {
            componentWithContext.unmount();
            rootContext = undefined;
        });

        test('alert method', () => {
            expect(rootContext.notie).toHaveProperty('alert');
            expect(typeof rootContext.notie.alert).toBe('function');
        });

        test('confirm method', () => {
            expect(rootContext.notie).toHaveProperty('confirm');
            expect(typeof rootContext.notie.confirm).toBe('function');
        });

        test('success method', () => {
            expect(rootContext.notie).toHaveProperty('success');
            expect(typeof rootContext.notie.success).toBe('function');
        });

        test('warn method', () => {
            expect(rootContext.notie).toHaveProperty('warn');
            expect(typeof rootContext.notie.warn).toBe('function');
        });

        test('error method', () => {
            expect(rootContext.notie).toHaveProperty('error');
            expect(typeof rootContext.notie.error).toBe('function');
        });

        test('info methods', () => {
            expect(rootContext.notie).toHaveProperty('info');
            expect(typeof rootContext.notie.info).toBe('function');
        });
    });
});
