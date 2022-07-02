import { NextPage } from "next";
import styles from './DrawingButton.module.css';

const DrawingButton: NextPage = () => {
    return (
        <button className={styles.button}>Draw</button>
    );
}

export { DrawingButton }