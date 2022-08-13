import { NextPage } from "next";
import { ChangeEvent, MutableRefObject } from "react";
import styles from './UsernameInput.module.css';

interface Props {
    usernameInput: MutableRefObject<HTMLInputElement | null>;
}

const UsernameInput: NextPage<Props> = ({ usernameInput }) => {
    return (
        <input
            className={styles.input}
            placeholder='Username'
            ref={usernameInput}
        />
    );
}

export { UsernameInput };