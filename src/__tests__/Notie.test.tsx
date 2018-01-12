import * as React from 'react';
import { mount } from 'enzyme';

import { Notie } from '../Notie';
import * as actions from '../actions';

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

    test('initial render', () => {
        expect(component).toMatchSnapshot();
    });

    test('can be mounted only once', () => {
        expect(() => mount(<Notie />)).toThrow();
    });

    test('success message', () => {
        actions.success('Success!');
        component.update();
        expect(component.find('.notie--success').length).toBe(1);
        expect(component.find('.notie--active').length).toBe(1);
        expect(component).toMatchSnapshot();
        jest.runTimersToTime(5000);
        component.update();
        expect(component.find('.notie--active').length).toBe(0);
        expect(component).toMatchSnapshot();
    });

    test('warn message', () => {
        actions.warn('Warn!');
        component.update();
        expect(component.find('.notie--warn').length).toBe(1);
        expect(component.find('.notie--active').length).toBe(1);
        expect(component).toMatchSnapshot();
        jest.runTimersToTime(5000);
        component.update();
        expect(component.find('.notie--active').length).toBe(0);
        expect(component).toMatchSnapshot();
    });

    test('error message', () => {
        actions.error('Error!');
        component.update();
        expect(component.find('.notie--error').length).toBe(1);
        expect(component.find('.notie--active').length).toBe(1);
        expect(component).toMatchSnapshot();
        jest.runTimersToTime(5000);
        component.update();
        expect(component.find('.notie--active').length).toBe(0);
        expect(component).toMatchSnapshot();
    });

    test('info message', () => {
        actions.info('Info!');
        component.update();
        expect(component.find('.notie--info').length).toBe(1);
        expect(component.find('.notie--active').length).toBe(1);
        expect(component).toMatchSnapshot();
        jest.runTimersToTime(5000);
        component.update();
        expect(component.find('.notie--active').length).toBe(0);
        expect(component).toMatchSnapshot();
    });

    test('consecutive calls', () => {
        const instance = component.instance();
        actions.info('Info!');
        component.update();
        expect(component.find('.notie--info').length).toBe(1);
        expect(component.find('.notie--active').length).toBe(1);
        expect(component).toMatchSnapshot();
        jest.runTimersToTime(2000);
        component.update();
        actions.error('Error!');

        /*
            Must be triggered manually since `transitionend` event
            is not being trigged when using `dispatchEvent` on root
            element.
        */
        instance.transitionendCallback();
        expect(instance.transitionendCallback).toBe(null);
        component.update();

        expect(component.find('.notie--error').length).toBe(1);
        expect(component.find('.notie--active').length).toBe(1);
        expect(component).toMatchSnapshot();
    });

    test('cleanup on unmount', () => {
        const instance = component.instance();
        actions.info('Info!');
        actions.info('Info!');
        jest.runTimersToTime(2000);
        component.update();
        component.unmount();
        expect(instance.transitionendCallback).toBe(null);
    });

    test('dismiss on click', () => {
        actions.info('Info!');
        component.update();
        expect(component.find('.notie--info').length).toBe(1);
        expect(component.find('.notie--active').length).toBe(1);
        expect(component).toMatchSnapshot();
        component.find('.notie-container').simulate('click');
        component.update();
        expect(component.find('.notie--active').length).toBe(0);
        expect(component).toMatchSnapshot();
    });

    describe('confirm', () => {
        test('initial render', () => {
            actions.confirm('Are you sure?');
            component.update();
            expect(component.find('.notie--confirm').length).toBe(1);
            expect(component.find('.notie--active').length).toBe(1);
            expect(component.find('.notie-btn--ok').length).toBe(1);
            expect(component.find('.notie-btn--cancel').length).toBe(1);
            expect(component).toMatchSnapshot();
        });

        test('Resolves on postive feedback', done => {
            const instance = component.instance();
            const promise = actions.confirm('Are you sure?');

            component.update();
            component.find('.notie-btn--ok').simulate('click');
            instance.transitionendCallback();
            expect(instance.transitionendCallback).toBe(null);
            component.update();

            promise.then(() => {
                expect(component).toMatchSnapshot();
                expect(component.find('.notie--active').length).toBe(0);
                done();
            });
        });

        test('Rejects on negative feedback', done => {
            const instance = component.instance();
            const promise = actions.confirm('Are you sure?');

            component.update();
            component.find('.notie-btn--cancel').simulate('click');
            instance.transitionendCallback();
            expect(instance.transitionendCallback).toBe(null);
            component.update();
            promise.catch(() => {
                expect(component).toMatchSnapshot();
                expect(component.find('.notie--active').length).toBe(0);
                done();
            });
        });

        test('Consecutive calls do not work', () => {
            const instance = component.instance();
            actions.confirm('Are you sure?');
            component.update();
            expect(component.find('.notie--confirm').length).toBe(1);
            expect(component).toMatchSnapshot();
            actions.info('Info!');
            component.update();
            expect(component.find('.notie--confirm').length).toBe(1);
            expect(component).toMatchSnapshot();
        });

        test('Custom button text', () => {
            const instance = component.instance();
            const options = {
                yesBtnText: 'Hell Yeah!',
                noBtnText: 'Fuck NO!'
            };
            actions.confirm('Are you sure?', options);
            component.update();
            expect(component.find('.notie-btn--ok').text()).toBe(options.yesBtnText);
            expect(component.find('.notie-btn--cancel').text()).toBe(options.noBtnText);
            expect(component).toMatchSnapshot();
        });
    });

    describe('force', () => {
        test('initial render', () => {
            actions.force('You have done it again!');
            component.update();
            expect(component.find('.notie--force').length).toBe(1);
            expect(component.find('.notie--active').length).toBe(1);
            expect(component.find('.notie-btn--ok').length).toBe(1);
            expect(component.find('.notie-btn--cancel').length).toBe(0);

            expect(component).toMatchSnapshot();
        });

        test('Resolves on feedback', done => {
            const instance = component.instance();
            const promise = actions.force('You have done it again!');

            component.update();
            component.find('.notie-btn--ok').simulate('click');
            instance.transitionendCallback();
            expect(instance.transitionendCallback).toBe(null);
            component.update();

            promise.then(() => {
                expect(component).toMatchSnapshot();
                expect(component.find('.notie--active').length).toBe(0);
                done();
            });
        });

        test('Consecutive calls do not work', () => {
            const instance = component.instance();
            actions.force('You have done it again!');
            component.update();
            expect(component.find('.notie--force').length).toBe(1);
            expect(component).toMatchSnapshot();
            actions.info('Info!');
            component.update();
            expect(component.find('.notie--force').length).toBe(1);
            expect(component).toMatchSnapshot();
        });

        test('Custom button text', () => {
            const instance = component.instance();
            const options = {
                yesBtnText: 'Hmmm OK?'
            };
            actions.confirm('Are you sure?', options);
            component.update();
            expect(component.find('.notie-btn--ok').text()).toBe(options.yesBtnText);
            expect(component).toMatchSnapshot();
        });
    });
});
