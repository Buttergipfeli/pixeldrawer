import { NextPage } from "next";
import styles from './Download.module.css';
import { Dropdown } from "../subcomponents/dropdown/Dropdown";
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import { imageService } from "../../service/image.service";
import { Loader } from "../subcomponents/loader/Loader";

type Props = {
    setErrorMessage: Dispatch<SetStateAction<string>>
}

const Download: NextPage<Props> = ({ setErrorMessage }) => {

    const [loading, setLoading] = useState(false);

    const downloadHandler = async () => {
        console.log('click');
        setLoading(true);
        const response = await imageService.exportCanvasToImage();
        if (response !== null) {
            setErrorMessage(response)
        }
        setLoading(false);
    }

    return (
        <div className={styles.download}>
            <Dropdown></Dropdown>
            <div
                className={styles.downloadText}
                style={(loading ? { cursor: 'default' } : {})}
                onClick={() => {
                    (loading ? {} : downloadHandler())
                }}
            >
                {(loading ? <Loader /> : 'Download')}
            </div>
        </div>
    );
}

export { Download };