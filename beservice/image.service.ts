import { color, pixel, PrismaClient, username } from "@prisma/client";
import nodeHtmlToImage from "node-html-to-image";
const prismaClientInstance: PrismaClient = require("../constants/prisma/prisma");
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

export async function getAllImages() {
    return await prismaClientInstance.image.findMany({
        orderBy: {
            image_number: 'desc'
        }
    });
}

export async function getImageByIId(iId: number) {
    return await prismaClientInstance.image.findFirst({
        where: {
            image_number: iId
        }
    });
}