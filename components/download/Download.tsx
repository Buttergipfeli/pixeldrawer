import { NextPage } from "next";
import styles from './Download.module.css';
import { Dropdown } from "../subcomponents/dropdown/Dropdown";

const Download: NextPage = () => {
    return (
        <div className={styles.download}>
            <Dropdown></Dropdown>
            <div className={styles.downloadText}>
                Download
            </div>
        </div>
    );
}

export { Download };