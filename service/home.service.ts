import { Color } from "../models/classes/Color";
import { Username } from "../models/classes/Username";
import { hexColor } from '../constants/regex/regex';
import { MutableRefObject } from "react";

export const homeService = {
    validatePixelInput
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