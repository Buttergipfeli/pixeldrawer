import { NextPage } from "next";
import styles from './Dropdown.module.css';

const Dropdown: NextPage = () => {
    return (
        <select className={styles.dropdown}>
            <option value='current'>Current</option>
        </select>
    );
}

export { Dropdown };