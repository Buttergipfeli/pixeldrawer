import { image } from "@prisma/client";
import { NextPage } from "next";
import { Dispatch, SetStateAction, useEffect, useState, MutableRefObject } from "react";
import styles from './Dropdown.module.css';
import { dropdownService } from "./service/dropdown.service";

type Props = {
    setErrorMessage: Dispatch<SetStateAction<string>>;
    currentImageSelected: MutableRefObject<number>;
}

const Dropdown: NextPage<Props> = ({ setErrorMessage, currentImageSelected }) => {

    const [imageData, setImageData] = useState<image[]>([]);

    useEffect(() => {
        dropdownService.fetchImageData(setErrorMessage, setImageData);
    }, []);

    return (
        <select className={styles.dropdown} onChange={(e) => dropdownService.dropdownHandler(currentImageSelected, e)}>
            <option value='0'>Current</option>
            {imageData.length > 0 &&
                imageData.map((image) =>
                    <option value={image.image_number} key={image.image_number}>
                        {image.image_name.substring(0, 2) + '.' + image.image_name.substring(2, 4) + '.' + image.image_name.substring(4, 8)}
                    </option>
                )
            }
        </select>
    );
}

export { Dropdown };