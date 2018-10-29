import styled from 'react-emotion';

import { NotieLevel } from './actions';

export interface NotieContainerProps {
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

export const NOTIE_CLOSE_CLASS = `notie-${Math.random()
    .toString(36)
    .slice(2)}`;

export const NotieContainer = styled('dialog')(
    {
        position: 'fixed',
        width: '100%',
        textAlign: 'center',
        fontSize: '14px',
        color: '#fff',
        margin: '0 auto',
        whiteSpace: 'nowrap',
        border: 'none',
        textOverflow: 'ellipsis',
        left: 0,
        pointerEvents: 'none',
        '&[open]': {
            pointerEvents: 'auto'
        }
    },
    (props: NotieContainerProps) => ({
        top: props.position === 'top' ? 0 : 'auto',
        bottom: props.position === 'bottom' ? 0 : 'auto',
        backgroundColor: props.level in colors ? colors[props.level] : '#444'
        // '&[open]': {
        //     animation: `${
        //         props.position === 'top' ? animateInFromTop : animateInFromBottom
        //     } 0.3s forwards`
        // },
        // [`&.${NOTIE_CLOSE_CLASS}`]: {
        //     animation: `${
        //         props.position === 'top' ? animateOutToTop : animateOutToBottom
        //     } 0.3s forwards`
        // }
    })
);

NotieContainer.displayName = 'NotieContainer';

export const NotieOverlay = styled('div')({
    position: 'fixed',
    minHeight: '100vh',
    height: '100%',
    top: '0',
    left: '0',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.65)'
});

NotieOverlay.displayName = 'NotieOverlay';

export const NotieMessage = styled('div')({
    padding: '20px'
});

NotieMessage.displayName = 'NotieMessage';

export const NotieChoices = styled('div')({
    display: 'flex',
    width: '100%'
});

NotieChoices.displayName = 'NotieChoices';

export interface NotieButtonProps {
    level: NotieLevel;
}

export const NotieButton = styled('button')(
    {
        padding: '20px',
        flexGrow: 1,
        border: 'none',
        textAlign: 'center',
        cursor: 'pointer'
    },
    (props: NotieButtonProps) => ({
        backgroundColor: props.level in colors ? colors[props.level] : '#444'
    })
);

NotieButton.displayName = 'NotieButton';
