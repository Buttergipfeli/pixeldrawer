import { NextPage } from 'next';
import styles from './ColorRegister.module.css';
import { ColorPicker } from '../subcomponents/colorpicker/ColorPicker';
import { UsernameInput } from '../subcomponents/usernameinput/UsernameInput';
import { DrawingButton } from '../subcomponents/drawingbutton/DrawingButton';

const ColorRegister: NextPage = () => {
    return (
        <div className={styles.colorRegister}>
            <div className={styles.colorAndUsername}>
                <ColorPicker></ColorPicker>
                <UsernameInput></UsernameInput>
            </div>
            <DrawingButton></DrawingButton>
        </div>
    );
}

export { ColorRegister };