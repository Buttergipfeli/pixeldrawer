import { hexColor } from '../constants/regex/regex';
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { pixelsService } from "./pixels.service";
import { color, username, pixel } from '@prisma/client';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const homeService = {
    getAllPixels,
    drawPixel,
    validatePixelInput,
    socketInitializer
}

async function getAllPixels(
    setErrorMessage: Dispatch<SetStateAction<string>>,
): Promise<
    (pixel & {
        color: color;
        username: username;
    })[]
    |
    null
> {

    const response = await pixelsService.getAllPixels();

    if (typeof response === 'string') {
        setErrorMessage(response);
        return null;
    }
    return response;

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

async function socketInitializer(
    responsePixels: (pixel & {
        color: color;
        username: username;
    })[],
    socket: MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap> | undefined>,
    setPixels: Dispatch<SetStateAction<(pixel & {
        color: color;
        username: username;
    })[]>>,
    selected: MutableRefObject<number>,
    setToolbarInfos: Dispatch<SetStateAction<{
        username: string;
        color: string;
    }>>
) {
    await fetch("/api/socket");
    socket.current = io();

    socket.current.on('connect', () => {
        setPixels(responsePixels);
    });

    socket.current.on('pixelsPut',
        (pixel: pixel & {
            username: username;
            color: color;
        }) => {
            const pixelsLength = responsePixels.length;
            for (let i = 0; i < pixelsLength; i++) {
                if (responsePixels[i].id === pixel.id) {
                    let tmpPixels = responsePixels;
                    tmpPixels[i] = pixel;
                    setPixels([...tmpPixels]);
                    if (selected.current === pixel.id) {
                        setToolbarInfos({ username: pixel.username.username, color: pixel.color.color });
                    }
                }
            }
        }
    );
}