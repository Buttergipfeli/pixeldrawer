import { image } from "@prisma/client";
import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction } from "react";
import { GetImageDataFetch } from "../../../../models/types/images";

export const dropdownService = {
    fetchImageData,
    dropdownHandler
}

const API_URL = '/api/images'
const headers = {
    'Content-Type': 'application/json'
}

async function fetchImageData(
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setImageData: Dispatch<SetStateAction<image[]>>
): Promise<void> {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: headers
    });

    const data: GetImageDataFetch = await response.json();
    if (!response.ok) {
        setErrorMessage(data.message);
        return;
    }

    setImageData(data.images);
}

function dropdownHandler(currentImageSelected: MutableRefObject<number>, e: ChangeEvent<HTMLSelectElement>) {
    const iId = e.target.value;
    currentImageSelected.current = parseInt(iId);
}