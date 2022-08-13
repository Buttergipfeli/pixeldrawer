import { pixel, Prisma } from "@prisma/client";

export type PixelsApi = {
    message: string;
    pixels?: pixel[]
}

export type PixelsApiBody = {
    username: Prisma.usernameCreateInput;
    color: Prisma.colorCreateInput;
}

export type PixelsPathApi = {
    message: string;
    pixel?: pixel;
}