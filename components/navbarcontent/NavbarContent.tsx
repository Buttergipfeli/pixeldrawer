import styles from './NavbarContent.module.css'
import { NextPage } from "next";
import { Navbar } from '../subcomponents/navbar/Navbar';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

type Props = {
    toolbar: string;
    setToolbar: Dispatch<SetStateAction<string>>;
}

const NavbarContent: NextPage<Props> = ({ toolbar, setToolbar }) => {


    return (
        <div>
            <Navbar toolbar={toolbar} setToolbar={setToolbar}></Navbar>
            <div className={styles.pusher}></div>
        </div>
    );
}

export { NavbarContent };