import styles from './DrawingButton.module.css';

const DrawingButton = ({ ...props }): JSX.Element => {
    return (
        <button {...props} className={styles.button}>Draw</button>
    );
}

export { DrawingButton }