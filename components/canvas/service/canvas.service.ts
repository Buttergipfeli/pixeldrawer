import { color, pixel } from "@prisma/client";

export const canvasService = {
    convertPixels
}

function convertPixels(pixels: (pixel & { color: color; })[]): { pixelX: (pixel & { color: color; })[][], loading: boolean } {
    let pixelX: (pixel & { color: color; })[][] = [];
    let pixelXContents: (pixel & { color: color; })[] = [];

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