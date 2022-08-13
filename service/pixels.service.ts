import { color, pixel } from "@prisma/client";
import { MutableRefObject } from "react";
import { Color } from "../models/classes/Color";
import { Username } from "../models/classes/Username";
import { PixelsApi, PixelsPathApi } from "../models/types/pixels";

export const pixelsService = {
    getAllPixels,
    drawPixel
}

const API_URL = '/api/pixels'
const headers = {
    'Content-Type': 'application/json'
}

async function getAllPixels(): Promise<string | (pixel & { color: color; })[]> {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: headers
    });

    const data: PixelsApi = await response.json();

    if (!response.ok) {
        return data.message;
    }
    return data.pixels as (pixel & { color: color; })[];
}

async function drawPixel(pid: number, color: MutableRefObject<(HTMLInputElement | null)[]>, username: MutableRefObject<HTMLInputElement | null>): Promise<string | (pixel & { color: color; })> {
    if (color.current[0] === null) {
        return 'Color can\'t be null!';
    }
    if (username.current === null) {
        return 'Username can\t be null!';
    }

    const colorObject = new Color(color.current[0].value);
    const usernameObject = new Username(username.current.value);

    const response = await fetch(API_URL + '/' + pid, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ username: usernameObject, color: colorObject })
    });

    const data: PixelsPathApi = await response.json();

    if (!response.ok) {
        return data.message;
    }
    return data.pixel as (pixel & { color: color; });
}