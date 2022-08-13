import { NextPage } from "next";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import styles from './Navbar.module.css';

type Props = {
    toolbar: string;
    setToolbar: Dispatch<SetStateAction<string>>;
}

const Navbar: NextPage<Props> = ({ toolbar, setToolbar }) => {

    const toggleToolbar = () => {
        if (toolbar === '') {
            localStorage.setItem('pixeldrawer-toolbar', 'rotate(-45deg)');
            setToolbar('rotate(-45deg)');
        } else {
            localStorage.setItem('pixeldrawer-toolbar', '');
            setToolbar('');
        }
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.titleLogo}>
                <img className={styles.logo} alt='Logo' src='/images/Logo.svg' />
                <h3 className={styles.title}>Pixeldrawer</h3>
            </div>
            <div className={styles.toolbar}>
                <svg style={{transform: toolbar}} onClick={() => toggleToolbar()} width="163" height="280" viewBox="0 0 163 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="81.5" y1="265.64" x2="81.5" y2="28.5" stroke="black" stroke-width="27" stroke-linecap="round" />
                    <path d="M37.5 0L163 0V43L0 43L37.5 0Z" fill="black" />
                </svg>
            </div>
        </div>
    );
}

export { Navbar };