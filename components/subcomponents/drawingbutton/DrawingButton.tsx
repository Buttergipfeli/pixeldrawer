import { NextPage } from 'next';
import { MutableRefObject } from 'react';
import styles from './DrawingButton.module.css';

type Props = {
    onClick: () => Promise<void>;
    reference: MutableRefObject<HTMLButtonElement | null>
}

const DrawingButton: NextPage<Props> = ({ onClick, reference }): JSX.Element => {
    return (
        <button className={styles.button} onClick={onClick} ref={reference}>Draw</button>
    );
}

export { DrawingButton }