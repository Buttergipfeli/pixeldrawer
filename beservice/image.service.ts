import { color, pixel, PrismaClient, username } from "@prisma/client";
import nodeHtmlToImage from "node-html-to-image";
import puppeteer from "puppeteer";
const prismaClientInstance: PrismaClient = require("../constants/prisma/prisma");
import { canvasInHtml } from "./canvashtml.service";

export async function createCanvasImagePuppeteer(
    pixels: (pixel & {
        color: color;
        username: username;
    })[]
) {
    const browser = await puppeteer.launch({
        defaultViewport: { width: 1030, height: 743 },
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();

    await page.setContent(canvasInHtml(pixels));

    const imageBuffer = await page.screenshot({ omitBackground: true });

    await page.close();
    await browser.close();

    return imageBuffer;
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