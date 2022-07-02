import { NextPage } from 'next';
import styles from './ColorRegister.module.css';

const ColorRegister: NextPage = () => {
    return (
        <div className={styles.colorRegister}>
            <div className={styles.colorPicker}>
                <input type='color' className={styles.color} />
                <div className={styles.superColorText}>
                    <span className={styles.colorText}>#00FF00</span>
                </div>
            </div>
        </div>
    );
}

export { ColorRegister };