import { NextPage } from "next";
import styles from './Download.module.css';
import { Dropdown } from "../subcomponents/dropdown/Dropdown";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { imageService } from "../../service/image.service";

type Props = {
    setErrorMessage: Dispatch<SetStateAction<string>>
}

const Download: NextPage<Props> = ({ setErrorMessage }) => {

    const downloadHandler = async () => {
        const response = await imageService.exportCanvasToImage();
        if (response !== null) {
            setErrorMessage(response)
        }
    }

    return (
        <div className={styles.download}>
            <Dropdown></Dropdown>
            <div
                className={styles.downloadText}
                onClick={() => downloadHandler()}
            >
                Download
            </div>
        </div>
    );
}

export { Download };