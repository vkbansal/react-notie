import * as React from 'react';
import { mount } from 'enzyme';

import { Notie } from '../Notie';
import * as actions from '../actions';
import * as components from '../components';

jest.useFakeTimers();

describe('<Notie />', () => {
    let component;

    beforeEach(() => {
        component = mount(<Notie />);
    });

    afterEach(() => {
        if (component) {
            component.unmount();
            component = null;
        }
    });

    test.skip('initial render', () => {
        expect(component).toMatchSnapshot();
    });

    test('success message', () => {
        actions.success('Success!');
        component.update();
        expect(component.find(components.NotieContainer).prop('level')).toBe('SUCCESS');
        expect(component.find(components.NotieContainer).prop('active')).toBe(true);
        expect(component).toMatchSnapshot();
        jest.runTimersToTime(5000);
        component.update();
        expect(component.find(components.NotieContainer).prop('active')).toBe(false);
        expect(component).toMatchSnapshot();
    });

    test('warn message', () => {
        actions.warn('Warn!');
        component.update();
        expect(component.find(components.NotieContainer).prop('level')).toBe('WARN');
        expect(component.find(components.NotieContainer).prop('active')).toBe(true);
        expect(component).toMatchSnapshot();
        jest.runTimersToTime(5000);
        component.update();
        expect(component.find(components.NotieContainer).prop('active')).toBe(false);
        expect(component).toMatchSnapshot();
    });

    test('error message', () => {
        actions.error('Error!');
        component.update();
        expect(component.find(components.NotieContainer).prop('level')).toBe('ERROR');
        expect(component.find(components.NotieContainer).prop('active')).toBe(true);
        expect(component).toMatchSnapshot();
        jest.runTimersToTime(5000);
        component.update();
        expect(component.find(components.NotieContainer).prop('active')).toBe(false);
        expect(component).toMatchSnapshot();
    });

    test('info message', () => {
        actions.info('Info!');
        component.update();
        expect(component.find(components.NotieContainer).prop('level')).toBe('INFO');
        expect(component.find(components.NotieContainer).prop('active')).toBe(true);
        expect(component).toMatchSnapshot();
        jest.runTimersToTime(5000);
        component.update();
        expect(component.find(components.NotieContainer).prop('active')).toBe(false);
        expect(component).toMatchSnapshot();
    });

    test.skip('consecutive calls', () => {
        const instance = component.instance();
        instance.info('Info!');
        component.update();
        expect(component.find(components.NotieContainer).prop('level')).toBe('SUCCESS');
        expect(component.find(components.NotieContainer).prop('active')).toBe(true);
        expect(component).toMatchSnapshot();
        jest.runTimersToTime(2000);
        component.update();
        instance.error('Error!');

        /*
            Must be triggered manually since `transitionend` event
            is not being trigged when using `dispatchEvent` on root
            element.
        */
        instance.transitionendCallback();
        expect(instance.transitionendCallback).toBe(null);
        component.update();

        expect(component.find('.react-notie-level--error').length).toBe(1);
        expect(component.find('.react-notie--active').length).toBe(1);
        expect(component).toMatchSnapshot();
    });

    test.skip('cleanup on unmount', () => {
        const instance = component.instance();
        actions.info('Info!');
        actions.info('Info!');
        jest.runTimersToTime(2000);
        component.update();
        component.unmount();
        expect(instance.transitionendCallback).toBe(null);
    });

    test('dismiss click', () => {
        actions.info('Info!');
        component.update();
        expect(component.find(components.NotieContainer).prop('level')).toBe('INFO');
        expect(component.find(components.NotieContainer).prop('active')).toBe(true);
        expect(component).toMatchSnapshot();
        component.find(components.NotieContainer).simulate('click');
        component.update();
        expect(component.find(components.NotieContainer).prop('active')).toBe(false);
        expect(component).toMatchSnapshot();
    });

    describe('confirm', () => {
        test('initial render', () => {
            actions.confirm('Are you sure?');
            component.update();
            expect(component.find(components.NotieContainer).prop('level')).toBe('CONFIRM');
            expect(component.find(components.NotieContainer).prop('active')).toBe(true);
            expect(component).toMatchSnapshot();
        });

        test.skip('click yes', done => {
            const instance = component.instance();
            const promise = instance.confirm('Are you sure?');

            component.update();
            component.find('.react-notie-choice--yes').simulate('click');
            instance.transitionendCallback();
            expect(instance.transitionendCallback).toBe(null);
            component.update();

            promise.then(() => {
                expect(component).toMatchSnapshot();
                expect(component.find(components.NotieContainer).prop('active')).toBe(false);
                done();
            });
        });

        test.skip('click no', done => {
            const instance = component.instance();
            const promise = instance.confirm('Are you sure?');

            component.update();
            component.find('.react-notie-choice--no').simulate('click');
            instance.transitionendCallback();
            expect(instance.transitionendCallback).toBe(null);
            component.update();
            promise.catch(() => {
                expect(component).toMatchSnapshot();
                expect(component.find(components.NotieContainer).prop('active')).toBe(false);
                done();
            });
        });

        test.skip('no consecutive calls', () => {
            const instance = component.instance();
            instance.confirm('Are you sure?');
            component.update();
            expect(component.find('.react-notie-level--confirm').length).toBe(1);
            expect(component).toMatchSnapshot();
            instance.info('Info!');
            component.update();
            expect(component.find('.react-notie-level--confirm').length).toBe(1);
            expect(component).toMatchSnapshot();
        });

        test.skip('Custom button text', () => {
            const instance = component.instance();
            instance.confirm('Are you sure?', {
                yesBtnText: 'Hell Yeah!',
                noBtnText: 'Fuck NO!'
            });
            expect(component).toMatchSnapshot();
        });
    });
});
