import { color, pixel, username } from "@prisma/client";
import prismaClientInstance from "../constants/prisma/prisma";

export async function getAllPixels(): Promise<(pixel & {
    username: username;
    color: color;
})[]> {
    return await prismaClientInstance.pixel.findMany({
        include: { color: true, username: true }
    });
}