import { NextPage } from "next";
import styles from './Navbar.module.css';

const Navbar: NextPage = () => {
    return (
        <div className={styles.navbar}>
            <img className={styles.logo} alt='Logo' src='/images/Logo.svg' />
            <h3 className={styles.title}>Pixeldrawer</h3>
        </div>
    );
}

export { Navbar };