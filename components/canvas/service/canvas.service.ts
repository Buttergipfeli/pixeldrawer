import { pixel } from "@prisma/client";

export const canvasService = {
    convertPixels
}

function convertPixels(pixels: pixel[]): { pixelX: pixel[][], loading: boolean } {
    let pixelX: pixel[][] = [];
    let pixelXContents: pixel[] = [];

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