import { NextPage } from 'next';
import styles from './ColorRegister.module.css';
import { ColorPicker } from '../subcomponents/colorpicker/ColorPicker';
import { UsernameInput } from '../subcomponents/usernameinput/UsernameInput';
import { DrawingButton } from '../subcomponents/drawingbutton/DrawingButton';
import { ChangeEvent, useState } from 'react';

const ColorRegister: NextPage = () => {

    const [color, setColor] = useState('');
    const [username, setUsername] = useState('');

    const colorHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value.toUpperCase());
    }

    const usernameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    return (
        <div className={styles.colorRegister}>
            <div className={styles.colorAndUsername}>
                <ColorPicker color={color} colorHandler={colorHandler}></ColorPicker>
                <UsernameInput username={username} usernameHandler={usernameHandler}></UsernameInput>
            </div>
            <DrawingButton></DrawingButton>
        </div>
    );
}

export { ColorRegister };