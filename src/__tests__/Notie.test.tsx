import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Notie, DEFAULT_TIMEOUT } from '../Notie';

jest.useFakeTimers();

describe('<Notie />', () => {
    let provider: ReactWrapper<{}, {}, Notie> | null;

    beforeEach(() => {
        provider = mount(<Notie />);
    });

    afterEach(() => {
        if (provider) {
            provider.unmount();
            provider = null;
        }
    });

    test('initial render', () => {
        expect(provider).toMatchSnapshot();
    });

    test('success message', () => {
        if (!provider) return;

        provider.instance().showSuccess('Success!');
        provider.update();
        expect(provider).toMatchSnapshot();
        // expect(provider.find(notieContainer).prop('level')).toBe(NotieLevel.SUCCESS);
        jest.runTimersToTime(DEFAULT_TIMEOUT + 100);
        provider.update();
        expect(provider).toMatchSnapshot();
    });

    test('warn message', () => {
        if (!provider) return;

        provider.instance().showWarn('Warn!');
        provider.update();
        expect(provider).toMatchSnapshot();
        // expect(provider.find(notieContainer).prop('level')).toBe(NotieLevel.WARN);
        jest.runTimersToTime(DEFAULT_TIMEOUT + 100);
        provider.update();
        expect(provider).toMatchSnapshot();
    });

    test('Error message', () => {
        if (!provider) return;

        provider.instance().showError('Error!');
        provider.update();
        expect(provider).toMatchSnapshot();
        // expect(provider.find('notieContainer').prop('level')).toBe(NotieLevel.ERROR);
        jest.runTimersToTime(DEFAULT_TIMEOUT + 100);
        provider.update();
        expect(provider).toMatchSnapshot();
    });

    test('info message', () => {
        if (!provider) return;

        provider.instance().showInfo('Info!');
        provider.update();
        expect(provider).toMatchSnapshot();
        // expect(provider.find(notieContainer).prop('level')).toBe(NotieLevel.INFO);
        jest.runTimersToTime(DEFAULT_TIMEOUT + 100);
        provider.update();
        expect(provider).toMatchSnapshot();
    });

    // test.skip('consecutive calls', () => {
    //     const instance = provider.instance();
    //     instance.info('Info!');
    //     provider.update();
    //     expect(provider.find(components.NotieContainer).prop('level')).toBe('SUCCESS');
    //     expect(provider.find(components.NotieContainer).prop('active')).toBe(true);
    //     expect(provider).toMatchSnapshot();
    //     jest.runTimersToTime(2000);
    //     provider.update();
    //     instance.error('Error!');

    //     /*
    //         Must be triggered manually since `transitionend` event
    //         is not being trigged when using `dispatchEvent` on root
    //         element.
    //     */
    //     instance.transitionendCallback();
    //     expect(instance.transitionendCallback).toBe(null);
    //     provider.update();

    //     expect(provider.find('.react-notie-level--error').length).toBe(1);
    //     expect(provider.find('.react-notie--active').length).toBe(1);
    //     expect(provider).toMatchSnapshot();
    // });

    // test.skip('cleanup on unmount', () => {
    //     const instance = provider.instance();
    //     actions.notieInfo('Info!');
    //     actions.notieInfo('Info!');
    //     jest.runTimersToTime(2000);
    //     provider.update();
    //     provider.unmount();
    //     expect(instance.transitionendCallback).toBe(null);
    // });

    // test('dismiss click', () => {
    //     actions.notieInfo('Info!');
    //     provider.update();
    //     expect(provider.find(components.NotieContainer).prop('level')).toBe('INFO');
    //     expect(provider.find(components.NotieContainer).prop('active')).toBe(true);
    //     expect(provider).toMatchSnapshot();
    //     provider.find(components.NotieContainer).simulate('click');
    //     provider.update();
    //     expect(provider.find(components.NotieContainer).prop('active')).toBe(false);
    //     expect(provider).toMatchSnapshot();
    // });

    // describe('confirm', () => {
    //     test('initial render', () => {
    //         actions.notieConfirm('Are you sure?');
    //         provider.update();
    //         expect(provider.find(components.NotieContainer).prop('level')).toBe('CONFIRM');
    //         expect(provider.find(components.NotieContainer).prop('active')).toBe(true);
    //         expect(provider).toMatchSnapshot();
    //     });

    //     test.skip('click yes', (done) => {
    //         const instance = provider.instance();
    //         const promise = instance.confirm('Are you sure?');

    //         provider.update();
    //         provider.find('.react-notie-choice--yes').simulate('click');
    //         instance.transitionendCallback();
    //         expect(instance.transitionendCallback).toBe(null);
    //         provider.update();

    //         promise.then(() => {
    //             expect(provider).toMatchSnapshot();
    //             expect(provider.find(components.NotieContainer).prop('active')).toBe(false);
    //             done();
    //         });
    //     });

    //     test.skip('click no', (done) => {
    //         const instance = provider.instance();
    //         const promise = instance.confirm('Are you sure?');

    //         provider.update();
    //         provider.find('.react-notie-choice--no').simulate('click');
    //         instance.transitionendCallback();
    //         expect(instance.transitionendCallback).toBe(null);
    //         provider.update();
    //         promise.catch(() => {
    //             expect(provider).toMatchSnapshot();
    //             expect(provider.find(components.NotieContainer).prop('active')).toBe(false);
    //             done();
    //         });
    //     });

    //     test.skip('no consecutive calls', () => {
    //         const instance = provider.instance();
    //         instance.confirm('Are you sure?');
    //         provider.update();
    //         expect(provider.find('.react-notie-level--confirm').length).toBe(1);
    //         expect(provider).toMatchSnapshot();
    //         instance.info('Info!');
    //         provider.update();
    //         expect(provider.find('.react-notie-level--confirm').length).toBe(1);
    //         expect(provider).toMatchSnapshot();
    //     });

    //     test.skip('Custom button text', () => {
    //         const instance = provider.instance();
    //         instance.confirm('Are you sure?', {
    //             yesBtnText: 'Hell Yeah!',
    //             noBtnText: 'Fuck NO!'
    //         });
    //         expect(provider).toMatchSnapshot();
    //     });
    // });
});
