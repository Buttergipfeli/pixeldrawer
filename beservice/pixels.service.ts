import { color, pixel, PrismaClient, username } from "@prisma/client";
import { hexColor } from "../constants/regex/regex";
const prismaClientInstance: PrismaClient = require("../constants/prisma/prisma");

export async function getAllPixels(): Promise<(pixel & {
    username: username;
    color: color;
})[]> {
    return await prismaClientInstance.pixel.findMany({
        include: { color: true, username: true }
    });
}

export function validatePixelInput(pid: number, username: string, color: string): { message: string, error: boolean } {
    if (pid === 0) {
        return { message: 'Please select a pixel!', error: true };
    } else if (color === null) {
        return { message: 'Color is null!', error: true };
    } else if (username === null) {
        return { message: 'Username is null!', error: true };
    } else if (!hexColor.test(color)) {
        return { message: 'Color isn\'t in hex!', error: true };
    } else if (username.length < 4 || username.length > 30) {
        return { message: 'Username is either too long (>30) or too short (<4)!', error: true };
    } else if (pid < 1 || pid > 1666) {
        return { message: 'Your pixel id is either too small or too large', error: true };
    }

    return { message: 'ok', error: false };
}