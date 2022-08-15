import { hexColor } from '../constants/regex/regex';
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { pixelsService } from "./pixels.service";
import { color, username, pixel } from '@prisma/client';

export const homeService = {
    getAllPixels,
    drawPixel,
    validatePixelInput
}

async function getAllPixels(
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setPixels: Dispatch<SetStateAction<(pixel & {
        color: color;
        username: username;
    })[]>>
): Promise<void> {

    const response = await pixelsService.getAllPixels();

    if (typeof response === 'string') {
        setErrorMessage(response);
        return;
    }
    setPixels(response);

}

async function drawPixel(
    selected: MutableRefObject<number>,
    colorPickerInput: MutableRefObject<(HTMLInputElement | null)[]>,
    usernameInput: MutableRefObject<HTMLInputElement | null>,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    pixels: (pixel & {
        color: color;
        username: username;
    })[],
    setPixels: Dispatch<SetStateAction<(pixel & {
        color: color;
        username: username;
    })[]>>,
    setToolbarInfos: Dispatch<SetStateAction<{
        username: string;
        color: string;
    }>>
): Promise<void> {

    const validateResponse = homeService.validatePixelInput(selected.current, colorPickerInput, usernameInput);
    if (validateResponse.error) {
        setErrorMessage(validateResponse.message);
        return;
    }

    const response = await pixelsService.drawPixel(selected.current, colorPickerInput, usernameInput);

    if (typeof response === 'string') {
        setErrorMessage(response);
        return;
    }

    const pixelsLength = pixels.length;
    for (let i = 0; i < pixelsLength; i++) {
        if (pixels[i].id === response.id) {
            let tmpPixels = pixels;
            tmpPixels[i] = response;
            setPixels(tmpPixels);
        }
    }
    setToolbarInfos({ username: response.username.username, color: response.color.color });
    setErrorMessage('');

}

function validatePixelInput(pid: number, color: MutableRefObject<(HTMLInputElement | null)[]>, username: MutableRefObject<HTMLInputElement | null>): { message: string, error: boolean } {
    if (pid === 0) {
        return { message: 'Please select a pixel!', error: true };
    } else if (color.current[0] === null) {
        return { message: 'Color is null!', error: true };
    } else if (username.current === null) {
        return { message: 'Username is null!', error: true };
    } else if (!hexColor.test(color.current[0].value)) {
        return { message: 'Color isn\'t in hex!', error: true };
    } else if (username.current.value.length < 4 || username.current.value.length > 255) {
        return { message: 'Username is either too long (>255) or too short (<4)!', error: true };
    } else if (pid < 1 || pid > 1666) {
        return { message: 'Your pixel id is either too small or too large', error: true };
    }

    return { message: 'ok', error: false };
}