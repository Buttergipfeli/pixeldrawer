import { NextPage } from "next";
import { ChangeEvent, LegacyRef, MutableRefObject } from "react";
import styles from './ColorPicker.module.css';

interface Props {
    colorHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    colorPickerInput: MutableRefObject<(HTMLInputElement | null)[]>;
}

const ColorPicker: NextPage<Props> = ({ colorHandler, colorPickerInput }) => {
    return (
        <div className={styles.colorPicker}>
            <input
                type='color'
                className={styles.color}
                ref={el => colorPickerInput.current[0] = el}
                onChange={(event) => colorHandler(event)}
            />
            <div className={styles.superColorText}>
                <input
                    className={styles.colorText}
                    type='text'
                    placeholder='#FFFFFF'
                    ref={el => colorPickerInput.current[1] = el}
                    onChange={(event) => colorHandler(event)}
                />
            </div>
        </div>

    );
}

export { ColorPicker };