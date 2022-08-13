import { NextPage } from 'next';
import styles from './ColorRegister.module.css';
import { ColorPicker } from '../subcomponents/colorpicker/ColorPicker';
import { UsernameInput } from '../subcomponents/usernameinput/UsernameInput';
import { DrawingButton } from '../subcomponents/drawingbutton/DrawingButton';
import { ChangeEvent, Dispatch, LegacyRef, MutableRefObject, SetStateAction, useCallback, useState } from 'react';
import { Username } from '../../models/classes/Username';
import { Color } from '../../models/classes/Color';
import { color, pixel } from '@prisma/client'

type Props = {
    drawPixel: () => Promise<void>;
    buttonDisabled: boolean;
    colorPickerInput: MutableRefObject<(HTMLInputElement | null)[]>;
    usernameInput: MutableRefObject<HTMLInputElement | null>;
}

const ColorRegister: NextPage<Props> = ({ drawPixel, buttonDisabled, colorPickerInput, usernameInput }) => {

    return (
        <div className={styles.colorRegister}>
            <div className={styles.colorAndUsername}>
                <ColorPicker colorPickerInput={colorPickerInput}></ColorPicker>
                <UsernameInput usernameInput={usernameInput}></UsernameInput>
            </div>
            <DrawingButton onClick={() => drawPixel()} disabled={buttonDisabled}></DrawingButton>
        </div>
    );
}

export { ColorRegister };