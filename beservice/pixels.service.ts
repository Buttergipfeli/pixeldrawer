import { color, pixel, PrismaClient, username } from "@prisma/client";
const prismaClientInstance: PrismaClient = require("../constants/prisma/prisma");

export async function getAllPixels(): Promise<(pixel & {
    username: username;
    color: color;
})[]> {
    return await prismaClientInstance.pixel.findMany({
        include: { color: true, username: true }
    });
}