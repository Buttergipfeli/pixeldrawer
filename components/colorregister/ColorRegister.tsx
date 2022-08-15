import { NextPage } from 'next';
import styles from './ColorRegister.module.css';
import { ColorPicker } from '../subcomponents/colorpicker/ColorPicker';
import { UsernameInput } from '../subcomponents/usernameinput/UsernameInput';
import { DrawingButton } from '../subcomponents/drawingbutton/DrawingButton';
import { MutableRefObject } from 'react';

type Props = {
    drawPixel: () => Promise<void>;
    buttonDisabled: MutableRefObject<HTMLButtonElement | null>;
    colorPickerInput: MutableRefObject<(HTMLInputElement | null)[]>;
    usernameInput: MutableRefObject<HTMLInputElement | null>;
}

const ColorRegister: NextPage<Props> = ({ drawPixel, buttonDisabled, colorPickerInput, usernameInput }) => {

    return (
        <div className={styles.colorRegister}>
            <div className={styles.colorRegisterContents}>
                <div className={styles.colorAndUsername}>
                    <ColorPicker colorPickerInput={colorPickerInput} />
                    <UsernameInput usernameInput={usernameInput} />
                </div>
                <div className={styles.buttonDiv}>
                    <DrawingButton
                        onClick={() => drawPixel()}
                        reference={buttonDisabled}
                    />
                </div>
            </div>
        </div>
    );
}

export { ColorRegister };