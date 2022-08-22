import { NextPage } from "next";
import styles from './Download.module.css';
import { Dropdown } from "../subcomponents/dropdown/Dropdown";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Loader } from "../subcomponents/loader/Loader";
import { downloadService } from "./service/download.service";

type Props = {
    setErrorMessage: Dispatch<SetStateAction<string>>
}

const Download: NextPage<Props> = ({ setErrorMessage }) => {

    const [loading, setLoading] = useState(false);
    const currentImageSelected = useRef(0);

    return (
        <div className={styles.download}>
            <Dropdown
                setErrorMessage={setErrorMessage}
                currentImageSelected={currentImageSelected}
            />
            <div
                className={styles.downloadText}
                style={(loading ? { cursor: 'default' } : {})}
                onClick={() => {
                    (loading ? {} : downloadService.downloadHandler(setLoading, setErrorMessage, currentImageSelected.current))
                }}
            >
                {(loading ? <Loader /> : 'Download')}
            </div>
        </div>
    );
}

export { Download };