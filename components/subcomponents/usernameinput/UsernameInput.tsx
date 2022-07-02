import { NextPage } from "next";
import styles from './UsernameInput.module.css';

const UsernameInput: NextPage = () => {
    return (
        <input className={styles.input} placeholder='Username' />
    );
}

export { UsernameInput };