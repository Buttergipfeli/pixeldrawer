import { NextPage } from "next";
import { ChangeEvent } from "react";
import styles from './UsernameInput.module.css';

interface Props {
    username: string;
    usernameHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UsernameInput: NextPage<Props> = ({ username, usernameHandler }) => {
    return (
        <input
            className={styles.input}
            placeholder='Username'
            value={username}
            onChange={(event) => usernameHandler(event)}
        />
    );
}

export { UsernameInput };