import { NextPage } from "next";
import { MutableRefObject } from "react";
import { colorPickerService } from "./service/colorpicker.service";
import styles from './ColorPicker.module.css';

interface Props {
    colorPickerInput: MutableRefObject<(HTMLInputElement | null)[]>;
}

const ColorPicker: NextPage<Props> = ({ colorPickerInput }) => {

    return (
        <div className={styles.colorPicker}>
            <input
                type='color'
                className={styles.color}
                ref={el => colorPickerInput.current[0] = el}
                onChange={(event) => colorPickerService.colorHandler(event, colorPickerInput)}
                onClick={() => colorPickerService.colorHandler('', colorPickerInput)}
            />
            <div className={styles.superColorText}>
                <input
                    className={styles.colorText}
                    type='text'
                    placeholder='#000000'
                    ref={el => colorPickerInput.current[1] = el}
                    onChange={(event) => colorPickerService.colorHandler(event, colorPickerInput)}
                />
            </div>
        </div>

    );
}

export { ColorPicker };