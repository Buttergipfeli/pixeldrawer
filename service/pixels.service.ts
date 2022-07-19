import { pixel } from "@prisma/client";
import { PixelsApi } from "../models/types/pixels";

export const pixelsService = {
    getAllPixels
}

const API_URL = '/api/pixels'
const headers = {
    'Content-Type': 'application/json'
}

async function getAllPixels(): Promise<string | pixel[]> {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: headers
    });

    const data: PixelsApi = await response.json();

    if (!response.ok) {
        return data.message;
    }
    return data.pixels as pixel[];
}