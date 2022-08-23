import { Dispatch, SetStateAction } from "react";
import { imageService } from "../../../service/image.service";

export const downloadService = {
    downloadHandler,
}

async function downloadHandler(
    setLoading: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    currentImageSelected: number
) {
    setLoading(true);
    if (currentImageSelected === 0) {
        const response = await imageService.exportCanvasToImage();
        if (response !== null) {
            setErrorMessage(response);
        }
    } else {
        const response = await imageService.downloadImageBackup(currentImageSelected);
        if (response !== null) {
            setErrorMessage(response);
        }
    }
    setLoading(false);
}