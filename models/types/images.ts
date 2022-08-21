import { image } from "@prisma/client";

export type GetImageApi = {
    image?: string;
    images?: image[]
    message: string;
}

export type GetImageFetch = {
    image: string;
    message: string;
}