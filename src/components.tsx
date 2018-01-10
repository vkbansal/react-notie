import * as React from 'react';
import glamorous, { GlamorousComponent } from 'glamorous';

import { NotieLevel } from './actions';

export interface NotieContainerProps {
    active: boolean;
    position: 'top' | 'bottom';
    level: NotieLevel;
}

const colors: Record<NotieLevel, string> = {
    [NotieLevel.SUCCESS]: '#13ce66',
    [NotieLevel.ERROR]: '#ff4949',
    [NotieLevel.INFO]: '#20a0ff',
    [NotieLevel.WARN]: '#f5be4b',
    [NotieLevel.CONFIRM]: '#20a0ff',
    [NotieLevel.FORCE]: '#20a0ff'
};

export const NotieContainer: GlamorousComponent<
    React.HTMLProps<HTMLDivElement> & NotieContainerProps,
    NotieContainerProps
> = glamorous<NotieContainerProps>('div')(
    {
        position: 'fixed',
        width: '100%',
        textAlign: 'center',
        fontSize: '14px',
        color: '#fff',
        transition: 'transform 0.3s ease-in-out',
        margin: '0 auto',
        whiteSpace: 'nowrap',
        // overflow: 'hidden',
        textOverflow: 'ellipsis',
        left: 0
    },
    props => ({
        pointerEvents: props.active ? 'auto' : 'none',
        top: props.position === 'top' ? 0 : 'auto',
        bottom: props.position === 'bottom' ? 0 : 'auto',
        transform: props.active
            ? 'translate(0, 0)'
            : props.position === 'top' ? 'translate(0, -106%)' : 'translate(0, 106%)',
        backgroundColor: props.level in colors ? colors[props.level] : '#444'
    })
);

NotieContainer.displayName = 'NotieContainer';

export const NotieOverlay = glamorous('div')({
    position: 'fixed',
    minHeight: '100vh',
    height: '100%',
    top: '0',
    left: '0',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.65)'
});

NotieOverlay.displayName = 'NotieOverlay';

export const NotieMessage = glamorous('div')({
    padding: '20px'
});

NotieMessage.displayName = 'NotieMessage';

export const NotieChoices = glamorous('div')({
    display: 'flex',
    width: '100%'
});

NotieChoices.displayName = 'NotieChoices';

export interface NotieButtonProps {
    level: NotieLevel;
}

export const NotieButton = glamorous<NotieButtonProps>('button')(
    {
        padding: '20px',
        flexGrow: 1,
        border: 'none',
        textAlign: 'center',
        cursor: 'pointer'
    },
    props => ({
        backgroundColor: props.level in colors ? colors[props.level] : '#444'
    })
);

NotieButton.displayName = 'NotieButton';
