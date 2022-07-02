import { NextPage } from "next";
import styles from './ColorPicker.module.css';

const ColorPicker: NextPage = () => {
    return (
        <div className={styles.colorPicker}>
            <input type='color' className={styles.color} />
            <div className={styles.superColorText}>
                <span className={styles.colorText}>#00FF00</span>
            </div>
        </div>

    );
}

export { ColorPicker };