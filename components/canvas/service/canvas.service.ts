import { color, pixel, username } from "@prisma/client";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

export const canvasService = {
    convertPixels,
    selectedHandler
}

function convertPixels(pixels: (pixel & { color: color, username: username })[]): { pixelX: (pixel & { color: color, username: username })[][], loading: boolean } {
    let pixelX: (pixel & { color: color, username: username })[][] = [];
    let pixelXContents: (pixel & { color: color, username: username })[] = [];

    pixels.map((p, index) => {
        ((index + 1) % 49 === 0
            ?
            pixelXContents.push(p) &&
            pixelX.push(pixelXContents) &&
            (pixelXContents = [])
            :
            pixelXContents.push(p)
        )
    });

    if (pixelX.length < 1) {
        return { pixelX: pixelX, loading: true };
    }
    return { pixelX: pixelX, loading: false };
}

function selectedHandler(selectedPixel: (pixel & { color: color, username: username }),
    setSelected: Dispatch<SetStateAction<number>>,
    selectedRef: MutableRefObject<number>,
    setToolbarInfos: Dispatch<SetStateAction<{
        username: string;
        color: string;
    }>>) {

    selectedRef.current = selectedPixel.id;

    setToolbarInfos({ username: selectedPixel.username.username, color: selectedPixel.color.color });
    setSelected(selectedPixel.id);

}