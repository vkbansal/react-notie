import React from 'react';
import { mount } from 'enzyme';

import Notie from '../src/Notie';

jest.useFakeTimers();

describe('<Notie />', () => {
    let component;

    beforeEach(() => {
        component = mount(
            <Notie />
        );
    });

    afterEach(() => {
        if (component) {
            component.unmount();
            component = null;
        }
    });

    test('initial render', () => {
        expect(component).toMatchSnapshot();
    });

    test('success message', () => {
        component.instance().success('Success!');
        expect(component.find('.react-notie-level--success').length).toBe(1);
        expect(component.find('.react-notie--active').length).toBe(1);
        expect(component).toMatchSnapshot();
        jest.runTimersToTime(5000);
        expect(component.find('.react-notie--active').length).toBe(0);
        expect(component).toMatchSnapshot();
    });

    test('warn message', () => {
        component.instance().warn('Warn!');
        expect(component.find('.react-notie-level--warn').length).toBe(1);
        expect(component.find('.react-notie--active').length).toBe(1);
        expect(component).toMatchSnapshot();
        jest.runTimersToTime(5000);
        expect(component.find('.react-notie--active').length).toBe(0);
        expect(component).toMatchSnapshot();
    });

    test('error message', () => {
        component.instance().error('Error!');
        expect(component.find('.react-notie-level--error').length).toBe(1);
        expect(component.find('.react-notie--active').length).toBe(1);
        expect(component).toMatchSnapshot();
        jest.runTimersToTime(5000);
        expect(component.find('.react-notie--active').length).toBe(0);
        expect(component).toMatchSnapshot();
    });

    test('info message', () => {
        component.instance().info('Info!');
        expect(component.find('.react-notie-level--info').length).toBe(1);
        expect(component.find('.react-notie--active').length).toBe(1);
        expect(component).toMatchSnapshot();
        jest.runTimersToTime(5000);
        expect(component.find('.react-notie--active').length).toBe(0);
        expect(component).toMatchSnapshot();
    });

    test('consecutive calls', () => {
        const instance = component.instance();
        instance.info('Info!');
        expect(component.find('.react-notie-level--info').length).toBe(1);
        expect(component.find('.react-notie--active').length).toBe(1);
        expect(component).toMatchSnapshot();
        jest.runTimersToTime(2000);
        instance.error('Error!');

        /*
            Must be triggered manually since `transitionend` event
            is not being trigged when using `dispatchEvent` on root
            element.
        */
        instance.transitionendCallback();
        expect(instance.transitionendCallback).toBe(null);

        expect(component.find('.react-notie-level--error').length).toBe(1);
        expect(component.find('.react-notie--active').length).toBe(1);
        expect(component).toMatchSnapshot();
    });

    test('cleanup on unmount', () => {
        const instance = component.instance();
        instance.info('Info!');
        instance.info('Info!');
        jest.runTimersToTime(2000);
        component.unmount();
        expect(instance.transitionendCallback).toBe(null);
    });

    describe('confirm', () => {
        test('initial render', () => {
            component.instance().confirm('Are you sure?');
            expect(component.find('.react-notie-level--confirm').length).toBe(1);
            expect(component.find('.react-notie--active').length).toBe(1);
            expect(component).toMatchSnapshot();
        });

        test('click yes', (done) => {
            const instance = component.instance();
            const promise = instance.confirm('Are you sure?');

            component.find('.react-notie-choice--yes').simulate('click');
            instance.transitionendCallback();
            expect(instance.transitionendCallback).toBe(null);
            promise.then(() => {
                expect(component).toMatchSnapshot();
                expect(component.find('.react-notie--active').length).toBe(0);
                done();
            });
        });

        test('click no', (done) => {
            const instance = component.instance();
            const promise = instance.confirm('Are you sure?');

            component.find('.react-notie-choice--no').simulate('click');
            instance.transitionendCallback();
            expect(instance.transitionendCallback).toBe(null);
            promise.catch(() => {
                expect(component).toMatchSnapshot();
                expect(component.find('.react-notie--active').length).toBe(0);
                done();
            });
        });

        test('no consecutive calls', () => {
            const instance = component.instance();
            instance.confirm('Are you sure?');
            expect(component.find('.react-notie-level--confirm').length).toBe(1);
            expect(component).toMatchSnapshot();
            instance.info('Info!');
            expect(component.find('.react-notie-level--confirm').length).toBe(1);
            expect(component).toMatchSnapshot();
        });

        test('Custom button text', () => {
            const instance = component.instance();
            instance.confirm('Are you sure?', {
                yesBtnText: 'Hell Yeah!',
                noBtnText: 'Fuck NO!'
            });
            expect(component).toMatchSnapshot();
        });
    });
});
