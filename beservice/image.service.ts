import { color, pixel, username } from "@prisma/client";
import nodeHtmlToImage from "node-html-to-image";
import { canvasService } from "../components/canvas/service/canvas.service";
import { canvasInHtml } from "./canvashtml.service";

export async function createCanvasImage(
    pixels: (pixel & {
        color: color;
        username: username;
    })[]
) {
    return await nodeHtmlToImage({
        type: "jpeg",
        quality: 100,
        html: canvasInHtml(pixels)
    });
}

export async function createCanvasImageBackup(
    pixels: (pixel & {
        color: color;
        username: username;
    })[]
) {
    return await nodeHtmlToImage({
        type: "jpeg",
        quality: 100,
        output: './public/images/canvasbackups/image.jpeg',
        html: canvasInHtml(pixels)
    });
}