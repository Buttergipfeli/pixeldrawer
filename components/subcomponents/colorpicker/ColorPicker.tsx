import { NextPage } from "next";
import { ChangeEvent } from "react";
import styles from './ColorPicker.module.css';

interface Props {
    color: string;
    colorHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ColorPicker: NextPage<Props> = ({ color, colorHandler }) => {
    return (
        <div className={styles.colorPicker}>
            <input
                type='color'
                className={styles.color}
                value={color}
                onChange={(event) => colorHandler(event)}
            />
            <div className={styles.superColorText}>
                <input
                    className={styles.colorText}
                    type='text'
                    value={color}
                    placeholder='#FFFFFF'
                    onChange={(event) => colorHandler(event)}
                />
            </div>
        </div>

    );
}

export { ColorPicker };